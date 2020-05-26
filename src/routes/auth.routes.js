const express = require('express');
const router = express.Router();
const authModel = require('../models/auth.models');
const jwt = require('jsonwebtoken');
const helpers = require('../lib/helpers');

router.post('/login', (req, res) => {
  const {
    email,
    password
  } = req.body;
  const login = {
    email,
    password
  }

  authModel.getUserByEmail(login.email)
    .then(user => {
      helpers.matchPassword(`${login.password}`, `${user.password}`) // buscar la manera correcta de àrsear esas variables a string
        .then((response) => {
          console.log('asdasdasd', response);
          const token = jwt.sign({ user }, 'jwt-secret'); // cambiar por secret variable de entorno
          res.status(200).json({
            success: true,
            message: 'Loggin success.',
            token
          });
        })
        .catch(err => {
          console.error(err)
          res.status(401).json({
            success: false,
            message: 'Email or password wrong.'
          });
        });
    })
    .catch(err => {
      res.status(401).json({
        success: false,
        message: 'Email or password wrong.'
      });
    });
});

module.exports = router;