var express = require('express');
var email = require('../../lib/email');

var router = express.Router();
router.get('/', getContact);
router.post('/', postContact);

module.exports = router;

function getContact(req, res) {
  res.render('contact', {
    err: null,
    data: {}
  });
}

function postContact(req, res, next) {    
  var subject = 'Message From ECC Website: ' + req.body.name;
  var body = req.body.message;
  var from = req.body.from;

  // Save to database...
  // Keen?

  email.sendAsync(subject, body, from).then(function() {
    res.redirect('/contact');
  }).catch(function(err) {
    next(err);
  });
}