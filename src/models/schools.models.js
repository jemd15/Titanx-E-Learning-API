const pool = require('../database');

let schoolsModel = {};

schoolsModel.getSchools = () => {
  return pool.query('SELECT * FROM school');
}

schoolsModel.createSchool = (newSchool) => {
  return pool.query('INSERT INTO school set ?', [newSchool]);
}

module.exports = schoolsModel;