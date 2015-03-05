var express = require('express');
var eventRouter = require('./events');
var contactRouter = require('./contact');

var router = express.Router();

router.use('/events', eventRouter);
router.use('/contact', contactRouter);

module.exports = router;
