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
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// routes
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/schools', require('./src/routes/schools.routes'));
app.use('/api/users', require('./src/routes/users.routes'));
app.use('/api',require('./src/routes/courses.routes'));

// public
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});