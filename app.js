var bodyParser = require('body-parser')
var config = require("./config");
var express = require('express');
var path = require('path');

var port = process.env.PORT || 3000;

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "jade");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

var staticRoute = require('./controllers/home/routes');
app.use('/', staticRoute);
//app.get('/', function(req, res){ res.render('index', {}) });

app.listen(port, function(){
  console.log('Express server listening on port ' + port);
});
