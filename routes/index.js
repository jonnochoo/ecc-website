var express = require('express');
var staticRouter = require('./static');
var eventRouter = require('./events/routes');
var contactRouter = require('./contact/routes');

var router = express.Router();

router.use('/', staticRouter);
router.use('/events', eventRouter);
router.use('/contact', contactRouter);

module.exports = router;
