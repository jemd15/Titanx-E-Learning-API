const pool = require('../database');

let coursesModel = {};

coursesModel.getCourses = (requester_id, requester_role) => {
  if(requester_role == 'student'){
    return pool.query("SELECT courseData.course_id, courseData.school_id, courseData.course, courseData.teacher, courseData.img_url FROM (SELECT course.course_id, course.school_id, course.name as course, concat(user.name, ' ', user.lastName) as teacher, course.img_url FROM course INNER JOIN teacher ON course.teacher_teacher_id=teacher.teacher_id INNER JOIN user ON teacher.user_user_id=user.user_id) as courseData INNER JOIN course_has_student ON courseData.course_id=course_has_student.course_course_id INNER JOIN student ON course_has_student.student_student_id=student_id INNER JOIN user ON student.user_user_id=user.user_id WHERE student.user_user_id=?;", [requester_id]);
  } else if (requester_role == 'teacher') {
    return pool.query("SELECT course.course_id, course.school_id, course.name as course, concat(user.name, ' ', user.lastName) as teacher, course.img_url FROM course INNER JOIN teacher ON course.teacher_teacher_id=teacher.teacher_id INNER JOIN user on teacher.user_user_id=user.user_id WHERE user.user_id=?", [requester_id]);
  } else if (requester_role == 'admin') {
    return pool.query("SELECT course.course_id, course.school_id, course.name as course, concat(user.name, ' ', user.lastName) as teacher, course.img_url FROM course INNER JOIN teacher ON course.teacher_teacher_id=teacher.teacher_id INNER JOIN user on teacher.user_user_id=user.user_id", [requester_id]);
  }
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

coursesModel.getActivityOfALesson = (course_id, unit_number, lesson_number) => {
  return pool.query('SELECT activity.activity_id, activity.number, activity.title, activity. description, activity.type, activity.url FROM activity INNER JOIN lesson ON lesson.lesson_id=activity.lesson_lesson_id INNER JOIN unit ON unit.unit_id=lesson.unit_unit_id INNER JOIN course ON unit.course_course_id=course.course_id WHERE unit.number=? AND lesson.number=? AND course_id=?', [unit_number, lesson_number, course_id]);
}

coursesModel.getActivitysByLessonId = (lesson_id) => {
  return pool.query('SELECT * FROM activity WHERE lesson_lesson_id = ?', [lesson_id]);
}

coursesModel.createActivity = (activity) => {
  return pool.query('INSERT INTO activity set ?', [activity]);
}

module.exports = coursesModel;