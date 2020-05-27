const express = require('express');
const router = express.Router();
const usersModel = require('../models/users.models');
const helpers = require('../lib/helpers');
const verifyRole = require('../lib/verifyRole');

// get users
router.get('/', verifyRole.admin, (req, res) => {
  usersModel.getUsers()
    .then(users => {
      users.forEach(user => {
        delete user['password']
      });
      res.status(200).json({
        success: true,
        message: 'all users.',
        users
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

// get teachers
router.get('/teachers', verifyRole.admin, (req, res) => {
  usersModel.getTeachers()
    .then(teachers => {
      teachers.forEach(teacher => {
        delete teacher['password']
      });
      res.status(200).json({
        success: true,
        message: 'all teachers.',
        teachers
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

// get students
router.get('/students', verifyRole.teacher, (req, res) => {
  usersModel.getStudents()
    .then(students => {
      students.forEach(student => {
        delete student['password']
      });
      res.status(200).json({
        success: true,
        message: 'all students.',
        students
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

// get admins
router.get('/admins', verifyRole.admin, (req, res) => {
  usersModel.getAdmins()
    .then(admins => {
      admins.forEach(admin => {
        delete admin['password']
      });
      res.status(200).json({
        success: true,
        message: 'all admins.',
        admins
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

// create user
router.post('/new', async (req, res) => {
  const {
    name, lastName, email, password, rol
  } = req.body;
  const user = {
    name, lastName, email, password, rol
  }
  user.password = await helpers.encyptPassword(user.password);

  usersModel.createUser(user)
    .then(newUser => {
      user.user_id = newUser.insertId
      delete user['password'];
      res.status(200).json({
        success: true,
        message: 'User created successfully.',
        newUser: user
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.sqlMessage
      });
    });
});

module.exports = router;
