const express = require('express');
const morgan = require('morgan');
const path = require('path');

// initializations
const app = express();

// settings
app.set('port', process.env.port || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// global variables
app.use((req, res, next) => {
  // esta función tendrá sentido más adelante
  next();
})

// routes
app.use('/courses', require('./routes/courses'));
app.use('/schools', require('./routes/schools'));
app.use('/users', require('./routes/users'));

// public
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
})