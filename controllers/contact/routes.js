var config = require('../../config');
var express = require('express');
var nodeMailer = require('nodemailer');
var Joi = require('joi');
var contactSchema = require('./contactSchema');

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
    var err = Joi.validate(req.body, contactSchema);
    if (err) {
        console.log(err);
        res.render('contact', {
            err: err,
            data: req.body
        });
        return;
    }

    var smtpTransport = nodeMailer.createTransport("SMTP", config.mail);
    var mailOptions = {
        to: config.mail.to,
        from: req.body.from,
        subject: 'Message From ECC Website: ' + req.body.name,
        text: req.body.message
    }
    smtpTransport.sendMail(mailOptions, function(err, response) {
        if (err) console.log(err);

        res.redirect('/contact');
    });
}