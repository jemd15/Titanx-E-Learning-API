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

coursesModel.getLessonByCourseId = (course_id, unit_number, lesson_number) => {  
  return pool.query('SELECT lesson.* FROM course INNER JOIN unit ON unit.course_course_id=course_id INNER JOIN lesson on lesson.unit_unit_id=unit.unit_id WHERE course.course_id=? AND unit.number=? AND lesson.number=?;' , [course_id, unit_number, lesson_number]);
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

coursesModel.getTestByCourseId = (course_id, unit_number, lesson_number) => {
  return pool.query('SELECT test.* FROM test INNER JOIN lesson ON lesson.lesson_id=test.lesson_lesson_id INNER JOIN unit ON unit.unit_id=lesson.unit_unit_id INNER JOIN course ON unit.course_course_id=course.course_id WHERE unit.number=? AND lesson.number=? AND course_id=?;', [unit_number, lesson_number, course_id]);
}

coursesModel.getQuestionsByTestId = (test_id) => {
  return pool.query('SELECT * FROM question WHERE test_test_id = ?', [test_id]);
}

coursesModel.getAnswersByQuestionId = (question_id) => {
  return pool.query('SELECT * FROM answer WHERE question_question_id=?;', [question_id]);
}

coursesModel.getResolvedTestsByCourseId = (course_id, unit_number, lesson_number) => {
  return pool.query("SELECT resolved_test.resolved_test_id, test_test_id as test_id, test_lesson_lesson_id as lesson_id, test_lesson_unit_unit_id as unit_id, test_lesson_unit_course_course_id as course_id, course.name as course, unit.number as unit, lesson.number as lesson, concat(user.name, ' ', user.lastName) as student FROM resolved_test INNER JOIN lesson ON lesson.lesson_id=test_lesson_lesson_id INNER JOIN unit ON unit.unit_id=test_lesson_unit_unit_id INNER JOIN course ON course.course_id=test_lesson_unit_course_course_id INNER JOIN student on student.student_id=student_student_id INNER JOIN user ON user.user_id=student.user_user_id WHERE course_id=? AND unit_number=? AND lesson_number=?", [course_id, unit_number, lesson_number]);
}

coursesModel.insertResolvedTest = () => {

}

module.exports = coursesModel;