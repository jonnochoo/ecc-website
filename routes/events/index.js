var config = require('../../config');
var express = require('express');
var gcal = require('google-calendar');
var moment = require('moment');
var redis = require('redis');
var request = require('request');
var _ = require('underscore');

client = redis.createClient(config.redis.port, config.redis.url);

var router = express.Router();
router.get('/', getEvents);
router.get('/save', saveEvents);

module.exports = router;

function getEvents(req, res){
  client.get("calendar:events", function(err, data){
    var events = JSON.parse(data);
    res.render('events', { events : events || [] });
  });
};

function saveEvents(req, res){
  saveItemsFromCalendar(function(err, isSaved){
    if(err) console.log(err);
    res.send(200);
  });
}

// Private
function saveItemsFromCalendar(callback){
  getAccessToken(function(err, accessToken){
    if(err) {
      callback(err, false);
    }
    else {
      var values = { maxResults: 50, timeMin: moment().toISOString(), singleEvents:true, orderBy:'startTime' };
      gcal(accessToken).events.list(config.googleCalendar.calendarId, values, function(err, data) {
        if(err) { return console.log(err); }

        var ignoreEvents = ["Sunday Service", "WACD", "WACD Thanksgiving Night"];
        var items = [];
        data.items.forEach(function(item){
          var isValid = _.every(ignoreEvents, function(evt){ return item.summary !== evt; });
          if(isValid) {
            var startMoment = moment(item.start.dateTime || item.start.date);
            var endMoment = moment(item.end.dateTime || item.end.date);
            console.log(item.summary);         
            console.log(startMoment); 
            items.push({
              name:item.summary,
              start: startMoment.format("dddd, MMMM Do YYYY"),
              startTime: item.start.dateTime ? startMoment.format("h:mm a") : "",
              end: endMoment.format("dddd, MMMM Do YYYY"),
              endTime: item.end.dateTime ? endMoment.format("h:mm a") : "",
              description: item.description,
              isOneDayEvent: isOneDayEvent(startMoment, endMoment),
              location:item.location || "TBC",
              id:item.id
            });
          }
        });
        var json = JSON.stringify(items);
        client.set("calendar:events", json, redis.print);
      });
      callback(err, true);
    }
  });
}

function getAccessToken(callback){
  request.post({
    url: 'https://accounts.google.com/o/oauth2/token',
    form:{
      client_id: config.googleCalendar.consumerKey,
      client_secret: config.googleCalendar.consumerSecret,
      refresh_token: config.googleCalendar.refreshToken,
      grant_type:'refresh_token'
    }
  }, function(err, response, body){
    if(err) {
      callback(err, null);
    }
    else {
      var r = JSON.parse(body);
      callback(null, r.access_token);
    }
  });
};

function isOneDayEvent(startMoment, endMoment){
  var shortDateFormat = "YYYY-MM-D";
  var startShortDate = startMoment.format(shortDateFormat);
  var endShortDate = endMoment.format(shortDateFormat);
  return startShortDate == endShortDate;
};
