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
    .then(userFound => {
      helpers.matchPassword(login.password, userFound[0].password)
        .then((success) => {
          if(success){
            const token = jwt.sign({ userFound }, 'jwt-secret'); // cambiar por secret variable de entorno
            userFound[0].token = token;
            delete userFound[0]['password'];
            res.status(200).json({
              success: true,
              message: 'Loggin success.',
              user: userFound[0]
            });
          }else {
            res.status(401).json({
              success: false,
              message: 'Password wrong.'
            });
          }
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