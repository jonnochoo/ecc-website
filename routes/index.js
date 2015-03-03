var express = require('express');
var staticRouter = require('./static');
var eventRouter = require('./events');
var contactRouter = require('./contact');

var router = express.Router();

router.use('/', staticRouter('./views/static'));
router.use('/events', eventRouter);
router.use('/contact', contactRouter);

module.exports = router;
