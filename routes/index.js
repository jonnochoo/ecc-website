var express = require('express');
var eventRouter = require('./events');
var contactRouter = require('./contact');
var staticRouter = require('./static');

var router = express.Router();

router.use('/events', eventRouter);
router.use('/contact', contactRouter);
router.use('/', staticRouter('views'));

module.exports = router;
