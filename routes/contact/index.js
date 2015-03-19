var config = require('../../config');
var express = require('express');
var nodeMailer = require('nodemailer');
var Joi = require('joi');

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

function postContact(req, res) {    
    var subject = 'Message From ECC Website: ' + req.body.name;
    var body = req.body.message;
    var from = req.body.from;

    sendMail(subject, body, from, function(err) {
        res.redirect('/contact');
    });
}

function sendMail(subject, body, from, callback) {
    var smtpTransport = nodeMailer.createTransport(config.mail);
    var mailOptions = { 
        to: config.mail.to,
        from: from,
        subject: subject,
        html: body
    };
    smtpTransport.sendMail(mailOptions, function(err, response) {
        callback(err);
    });
}