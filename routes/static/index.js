var express = require('express');

var router = express.Router();

router.get('/', function(req, res){ res.render('index', {}) });
router.get('/about', function(req, res){ res.render('about', {}) });
router.get('/faq', function(req, res){ res.render('faq', {}) });
router.get('/jesus', function(req, res){ res.render('jesus', {}) });
router.get('/map', function(req, res){ res.render('map', {}) });
router.get('/ministries', function(req, res){ res.render('ministries', {}) });
router.get('/ministries/adults', function(req, res){ res.render('adults', {}) });
router.get('/ministries/children', function(req, res){ res.render('children', {}) });
router.get('/ministries/church', function(req, res){ res.render('church-wide', {}) });
router.get('/ministries/youth', function(req, res){ res.render('youth', {}) });
router.get('/new', function(req, res){ res.render('new', {}) });    
router.get('/resources', function(req, res){ res.render('resources', {}) });
router.get('/sunday', function(req, res){ res.render('sunday', {}) });

module.exports = router;