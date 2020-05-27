const express = require('express');
var cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// initializations
const app = express();

// settings
app.set('port', process.env.port || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// routes
app.use('/auth', require('./routes/auth.routes'));
app.use('/courses', require('./routes/courses.routes'));
app.use('/schools', require('./routes/schools.routes'));
app.use('/users', require('./routes/users.routes'));

// public
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});