const pool = require('../database');

let coursesModel = {};

coursesModel.getCourses = () => {
  return pool.query('SELECT * FROM course');
}

coursesModel.createCourse = (newCourse) => {
  return pool.query('INSERT INTO course set ?', [newCourse]);
}

coursesModel.getCourseById = (course_id) => {
  return pool.query('SELECT * FROM course WHERE course_id = ?', [course_id]);
}

coursesModel.getUnitsByCourseId = (course_id) => {
  return pool.query('SELECT * FROM unit WHERE course_course_id = ?' , [course_id]);
}

coursesModel.getUnitById = (unit_id) => {
  return pool.query('SELECT * FROM unit WHERE unit_id = ?' , [unit_id]);
}

coursesModel.createUnit = (unit) => {
  return pool.query('INSERT INTO unit set ?', [unit]);
}

coursesModel.getLessonsByUnitId = (unit_id) => {
  return pool.query('SELECT * FROM lesson WHERE unit_unit_id = ?', [unit_id]);
}

coursesModel.getLessonById = (lesson_id) => {
  return pool.query('SELECT * FROM lesson WHERE lesson_id = ?' , [lesson_id]);
}

coursesModel.createLesson = (lesson) => {
  return pool.query('INSERT INTO lesson set ?', [lesson]);
}

coursesModel.getActivityById = (activity_id) => {
  return pool.query('SELECT * FROM activity WHERE activity_id = ?' , [activity_id]);
}

coursesModel.getActivitysByLessonId = (lesson_id) => {
  return pool.query('SELECT * FROM activity WHERE lesson_lesson_id = ?', [lesson_id]);
}

coursesModel.createActivity = (activity) => {
  return pool.query('INSERT INTO activity set ?', [activity]);
}

module.exports = coursesModel;