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

// get students by schoolId
router.get('/school/:school_id', verifyRole.teacher, (req, res) => {
  usersModel.getStudentsBySchoolId(req.params.school_id)
    .then(students => {
      res.status(200).json({
        success: true,
        message: `Students from school with id = ${req.params.school_id}`,
        students
      });
    })
    .catch(err => {
      res.send(500).json({
        success: false,
        message: `Error on getStudentsBySchoolId`
      });
    });
});

// get students by courseId
router.get('/course/:course_id', verifyRole.teacher, (req, res) => {
  usersModel.getStudentsByCourseId(req.params.course_id)
    .then(students => {
      res.status(200).json({
        success: true,
        message: `Students from course with id = ${req.params.course_id}`,
        students
      });
    })
    .catch(err => {
      res.send(500).json({
        success: false,
        message: `Error on getStudentsByCourseId`
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
router.post('/new', verifyRole.teacher, async (req, res) => {
  const {
    name, lastName, email, password, rol, school_school_id
  } = req.body;
  const user = {
    name, lastName, email, password, rol, school_school_id
  }
  user.password = await helpers.encyptPassword(user.password);

  usersModel.createUser(user)
    .then(newUser => {
      user.user_id = newUser.insertId
      // delete user['password'];
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
