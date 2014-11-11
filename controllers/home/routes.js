var express = require('express');

function setup(app) {
    app.get('/', function(req, res){ res.render('index', {}) });
    app.get('/about', function(req, res){ res.render('about', {}) });
    app.get('/faq', function(req, res){ res.render('faq', {}) });
    app.get('/jesus', function(req, res){ res.render('jesus', {}) });
    app.get('/map', function(req, res){ res.render('map', {}) });
    app.get('/ministries', function(req, res){ res.render('ministries', {}) });
    app.get('/ministries/adults', function(req, res){ res.render('adults', {}) });
    app.get('/ministries/children', function(req, res){ res.render('children', {}) });
    app.get('/ministries/church', function(req, res){ res.render('church-wide', {}) });
    app.get('/ministries/youth', function(req, res){ res.render('youth', {}) });
    app.get('/new', function(req, res){ res.render('new', {}) });    
    app.get('/resources', function(req, res){ res.render('resources', {}) });
    app.get('/sunday', function(req, res){ res.render('sunday', {}) });
};

module.exports = setup;
