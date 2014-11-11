var config = require("./config");
var express = require('express');
var path = require('path');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "jade");

app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.compress());
app.use(express.static(path.join(__dirname, 'public')));

[
  "./controllers/home/routes",
  "./controllers/events/routes",
  "./controllers/contact/routes"
].forEach(function (routePath) {
    require(routePath)(app);
});
app.use(app.router);

app.listen(app.get('port'));
