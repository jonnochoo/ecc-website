var nodeMailer = require('nodemailer');
var config = require('../config');
var Promise = require('bluebird');

function sendAsync(subject, body, from) {
  var smtpTransport = nodeMailer.createTransport(config.mail);
  var mailOptions = { 
    to: config.mail.to,
    from: from,
    subject: subject,
    html: body
  };
  var smtp = Promise.promisifyAll(smtpTransport);
  return smtp.sendMailAsync(mailOptions);
}

module.exports = { 
  sendAsync: sendAsync
};