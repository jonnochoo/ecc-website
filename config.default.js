var config = module.exports;

config.mail = {
  to: '',
  host: '',
  secure: true,
  port: 587,
  auth: {
    username: '',
    pass: ''
  }
}

config.express = {
  port: process.env.PORT || 3000
};

config.googleCalendar = {
  calendarId: '',
  consumerKey : '',
  consumerSecret : '',
  refreshToken: ''
};

config.redis = {
  port: 6379,
  url: '127.0.0.1'
};
