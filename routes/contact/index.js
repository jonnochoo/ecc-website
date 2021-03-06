var express = require('express');
var email = require('../../lib/email');
var request = require('request');
var config = require('../../config');

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

  var secretKey = config.express.recaptchaSecret;
  var uri = 'https://www.google.com/recaptcha/api/siteverify?secret=' + secretKey + '&response=' + req.body['g-recaptcha-response'];
  request.post({ uri: uri, method: 'POST' }, function (req1, res1, body1) {
    console.log(body1)
    var result = JSON.parse(body1);
    if (result.success) {
      email.sendAsync(subject, body, from).then(function () {
        res.redirect('/contact');
      }).catch(function (err) {
        next(err);
      });
    } else {
      next('failed captcha');
    }
  });


}