var express = require('express');
var http = require('http');
var path = require('path');
var reload = require('reload');
var bodyParser = require('body-parser');
var logger = require('morgan');
var watch = require('watch');
var sequelize = require('sequelize');
var PrettyError = require('pretty-error');
var cookieParser = require('cookie-parser');
var cookieEncrypter = require('cookie-encrypter');
var session = require('express-session');
var passport = require('passport');
var consolidate = require('consolidate');
var cookieSecretKey = process.env.COOKIE_SECRET_KEY;
var sessionSecretKey = process.env.SESSION_SECRET_KEY;
var app = express();
var config = require('./server/config/config.js');

// Initialize pretty-error
var pe = new PrettyError();
pe.start();

// Set port for heroku deployment
app.set('port', process.env.PORT || 5000);
app.use(logger('dev'));

// Service static assets
app.use(express.static(path.join(__dirname, 'merchant_store/build/')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'merchant_store/build/', 'index.html'));
});


// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json({limit: '200mb'}));

// passport & cookie encryption config
//require('./server/config/passport')(app);
/*
app.use(cookieParser(cookieSecretKey));
app.use(cookieEncrypter(cookieSecretKey));
app.use(session({
  secret: sessionSecretKey,
  resave: false,
  saveUninitialized: true
}));
*/
//app.use(passport.initialize());
//app.use(passport.session());

// Set swig as the template engine
app.engine('template.html', consolidate[config.templateEngine]);

// Set views path and view engine
app.set('view engine', 'template.html');

// Index Routes
//require('./routes/index.js')(app);

  var server = http.createServer(app);
  server.listen(process.env.PORT || 5000, ()=> {
    console.log('App is listening on port ' + 5000 + '! Visit localhost:' + 5000 + ' in your browser.');
  });

  // Reload code here
  var reloadServer = reload(server, app);

  watch.watchTree(__dirname + "/merchant_store/build/", function (f, curr, prev) {
    // Fire server-side reload event
    reloadServer.reload();
  });