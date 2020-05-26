const pool = require('../database');
let moment = require('moment');
let usersModel = {};

usersModel.getUsers = () => {
  return pool.query('SELECT * FROM user');
}

usersModel.getTeachers = () => {
  return pool.query('SELECT * FROM user WHERE rol = "teacher"');
}

usersModel.getStudents = () => {
  return pool.query('SELECT * FROM user WHERE rol = "student"');
}

usersModel.getAdmins = () => {
  return pool.query('SELECT * FROM user WHERE rol="admin"');
}

usersModel.createUser = (user) => {
  user.createdAt = moment().format('YYYY-MM-DD hh:mm:ss');
  return pool.query('INSERT INTO user set ?', [user]);
}

module.exports = usersModel;