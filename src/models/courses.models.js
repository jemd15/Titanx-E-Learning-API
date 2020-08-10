const pool = require('../database');

let coursesModel = {};

coursesModel.getTeacher = (teacher_user_id) => {
  return pool.query("SELECT teacher_id FROM teacher WHERE user_user_id = ?;", [teacher_user_id]);
}

coursesModel.getCourses = (requester_id, requester_role) => {
  if (requester_role == 'student') {
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
  return pool.query('SELECT * FROM unit WHERE course_course_id = ?', [course_id]);
}

coursesModel.getUnitById = (unit_id) => {
  return pool.query('SELECT * FROM unit WHERE unit_id = ?', [unit_id]);
}

coursesModel.createUnit = (unit) => {
  return pool.query('INSERT INTO unit set ?', [unit]);
}

coursesModel.getLessonsByUnitId = (unit_id) => {
  return pool.query('SELECT * FROM lesson WHERE unit_unit_id = ?', [unit_id]);
}

coursesModel.getLessonById = (lesson_id) => {
  return pool.query('SELECT * FROM lesson WHERE lesson_id = ?', [lesson_id]);
}

coursesModel.getLessonByCourseId = (course_id, unit_number, lesson_number) => {
  return pool.query('SELECT lesson.* FROM course INNER JOIN unit ON unit.course_course_id=course_id INNER JOIN lesson on lesson.unit_unit_id=unit.unit_id WHERE course.course_id=? AND unit.number=? AND lesson.number=?;', [course_id, unit_number, lesson_number]);
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

coursesModel.getTestByLessonId = (lesson_id) => {
  return pool.query('SELECT test.* FROM test INNER JOIN lesson ON lesson.lesson_id=test.lesson_lesson_id INNER JOIN unit ON unit.unit_id=lesson.unit_unit_id INNER JOIN course ON unit.course_course_id=course.course_id WHERE lesson.lesson_id=?', [lesson_id]);
}

coursesModel.getQuestionsByTestId = (test_id) => {
  return pool.query('SELECT * FROM question WHERE test_test_id = ?', [test_id]);
}

coursesModel.getAnswersByQuestionId = (question_id) => {
  return pool.query('SELECT * FROM answer WHERE question_question_id=?;', [question_id]);
}

coursesModel.getResolvedTestsByTestIdAndStudentId = (test_id, student_id) => {
  return pool.query("SELECT resolved_test_id, concat(user.name, ' ', user.lastName) as student, resolved_test.title as question, response, resolved_test.student_id, resolved_test.test_id, lesson.title as lesson, unit.title as unit, course.name as course FROM resolved_test INNER JOIN student ON resolved_test.student_id = student.student_id INNER JOIN test ON resolved_test. test_id = test.test_id INNER JOIN lesson ON lesson_lesson_id = lesson.lesson_id INNER JOIN unit ON lesson_unit_unit_id = unit.unit_id INNER JOIN course ON unit_course_course_id = course.course_id INNER JOIN user ON student.user_user_id = user.user_id WHERE test.test_id = ? AND student.student_id = ?;", [test_id, student_id]);
}

coursesModel.getResolvedTestsByCourseId = (course_id) => {
  return pool.query("SELECT concat(user.name, ' ', user.lastName) as student, resolved_test.test_id, lesson.title as lesson, unit.title as unit, course.course_id, course.name as course, datetime FROM resolved_test INNER JOIN student ON resolved_test.student_id = student.student_id INNER JOIN test ON resolved_test. test_id = test.test_id INNER JOIN lesson ON lesson_lesson_id = lesson.lesson_id INNER JOIN unit ON lesson_unit_unit_id = unit.unit_id INNER JOIN course ON unit_course_course_id = course.course_id INNER JOIN user ON student.user_user_id = user.user_id WHERE course.course_id = ? GROUP BY datetime;", [course_id]);
}

coursesModel.getResolvedTests = (page, elementsPerPage) => {
  const offset = (page == 1) ? 0 : elementsPerPage * (page - 1);
  return pool.query("SELECT student.student_id, concat(user.name, ' ', user.lastName) as student, resolved_test.test_id, lesson.title as lesson, unit.title as unit, course.course_id, course.name as course, datetime FROM resolved_test INNER JOIN student ON resolved_test.student_id = student.student_id INNER JOIN test ON resolved_test. test_id = test.test_id INNER JOIN lesson ON lesson_lesson_id = lesson.lesson_id INNER JOIN unit ON lesson_unit_unit_id = unit.unit_id INNER JOIN course ON unit_course_course_id = course.course_id INNER JOIN user ON student.user_user_id = user.user_id GROUP BY datetime LIMIT ?,?;", [offset, elementsPerPage]);
}

coursesModel.getResolvedTestsDetail = (student_id, test_id) => {
  return pool.query("SELECT student.student_id, concat(user.name, ' ', user.lastName) as student, resolved_test.test_id, resolved_test.title, resolved_test.response, lesson.title as lesson, unit.title as unit, course.course_id, course.name as course, datetime FROM resolved_test INNER JOIN student ON resolved_test.student_id = student.student_id INNER JOIN test ON resolved_test. test_id = test.test_id INNER JOIN lesson ON lesson_lesson_id = lesson.lesson_id INNER JOIN unit ON lesson_unit_unit_id = unit.unit_id INNER JOIN course ON unit_course_course_id = course.course_id INNER JOIN user ON student.user_user_id = user.user_id WHERE student.student_id = ? AND test.test_id = ?;", [student_id, test_id]);
}

coursesModel.getTotalPagesOfResolvedTests = () => {
  return pool.query("SELECT concat(user.name, ' ', user.lastName) as student, resolved_test.test_id, lesson.title as lesson, unit.title as unit, course.course_id, course.name as course, datetime FROM resolved_test INNER JOIN student ON resolved_test.student_id = student.student_id INNER JOIN test ON resolved_test. test_id = test.test_id INNER JOIN lesson ON lesson_lesson_id = lesson.lesson_id INNER JOIN unit ON lesson_unit_unit_id = unit.unit_id INNER JOIN course ON unit_course_course_id = course.course_id INNER JOIN user ON student.user_user_id = user.user_id GROUP BY datetime;");
}

coursesModel.searchTotalPagesOfResolvedTests = (data) => {
  if (data.lesson === null && data.unit !== null) {
    return pool.query("SELECT concat(user.name, ' ', user.lastName) as student, resolved_test.test_id, lesson.title as lesson, unit.title as unit, course.course_id, course.name as course, datetime FROM resolved_test INNER JOIN student ON resolved_test.student_id = student.student_id INNER JOIN test ON resolved_test. test_id = test.test_id INNER JOIN lesson ON lesson_lesson_id = lesson.lesson_id INNER JOIN unit ON lesson_unit_unit_id = unit.unit_id INNER JOIN course ON unit_course_course_id = course.course_id INNER JOIN user ON student.user_user_id = user.user_id WHERE unit.title = ? GROUP BY datetime;", [data.unit]);
  } else if (data.lesson !== null) {
    return pool.query("SELECT concat(user.name, ' ', user.lastName) as student, resolved_test.test_id, lesson.title as lesson, unit.title as unit, course.course_id, course.name as course, datetime FROM resolved_test INNER JOIN student ON resolved_test.student_id = student.student_id INNER JOIN test ON resolved_test. test_id = test.test_id INNER JOIN lesson ON lesson_lesson_id = lesson.lesson_id INNER JOIN unit ON lesson_unit_unit_id = unit.unit_id INNER JOIN course ON unit_course_course_id = course.course_id INNER JOIN user ON student.user_user_id = user.user_id WHERE lesson.title = ? GROUP BY datetime;", [data.lesson]);
  } else if (data.unit === null && data.lesson === null && data.course !== null) {
    return pool.query("SELECT concat(user.name, ' ', user.lastName) as student, resolved_test.test_id, lesson.title as lesson, unit.title as unit, course.course_id, course.name as course, datetime FROM resolved_test INNER JOIN student ON resolved_test.student_id = student.student_id INNER JOIN test ON resolved_test. test_id = test.test_id INNER JOIN lesson ON lesson_lesson_id = lesson.lesson_id INNER JOIN unit ON lesson_unit_unit_id = unit.unit_id INNER JOIN course ON unit_course_course_id = course.course_id INNER JOIN user ON student.user_user_id = user.user_id WHERE course.name = ? GROUP BY datetime;", [data.course]);
  }
}

coursesModel.downloadResolvedTests = (data) => {
  if (data.lesson === null && data.unit !== null) {
    return pool.query("SELECT concat(user.name, ' ', user.lastName) as student, resolved_test.test_id, resolved_test.title, resolved_test.response, lesson.title as lesson, unit.title as unit, course.course_id, course.name as course, datetime FROM resolved_test INNER JOIN student ON resolved_test.student_id = student.student_id INNER JOIN test ON resolved_test. test_id = test.test_id INNER JOIN lesson ON lesson_lesson_id = lesson.lesson_id INNER JOIN unit ON lesson_unit_unit_id = unit.unit_id INNER JOIN course ON unit_course_course_id = course.course_id INNER JOIN user ON student.user_user_id = user.user_id WHERE unit.title = ?;", [data.unit]);
  } else if (data.lesson !== null) {
    return pool.query("SELECT concat(user.name, ' ', user.lastName) as student, resolved_test.test_id, resolved_test.title, resolved_test.response, lesson.title as lesson, unit.title as unit, course.course_id, course.name as course, datetime FROM resolved_test INNER JOIN student ON resolved_test.student_id = student.student_id INNER JOIN test ON resolved_test. test_id = test.test_id INNER JOIN lesson ON lesson_lesson_id = lesson.lesson_id INNER JOIN unit ON lesson_unit_unit_id = unit.unit_id INNER JOIN course ON unit_course_course_id = course.course_id INNER JOIN user ON student.user_user_id = user.user_id WHERE lesson.title = ?;", [data.lesson]);
  } else if (data.unit === null && data.lesson === null && data.course !== null) {
    return pool.query("SELECT concat(user.name, ' ', user.lastName) as student, resolved_test.test_id, resolved_test.title, resolved_test.response, lesson.title as lesson, unit.title as unit, course.course_id, course.name as course, datetime FROM resolved_test INNER JOIN student ON resolved_test.student_id = student.student_id INNER JOIN test ON resolved_test. test_id = test.test_id INNER JOIN lesson ON lesson_lesson_id = lesson.lesson_id INNER JOIN unit ON lesson_unit_unit_id = unit.unit_id INNER JOIN course ON unit_course_course_id = course.course_id INNER JOIN user ON student.user_user_id = user.user_id WHERE course.name = ?;", [data.course]);
  }
}

coursesModel.searchResolvedTests = (page, elementsPerPage, data) => {
  const offset = (page == 1) ? 0 : elementsPerPage * (page - 1);
  if (data.lesson === null && data.unit !== null) {
    return pool.query("SELECT student.student_id, concat(user.name, ' ', user.lastName) as student, resolved_test.test_id, lesson.title as lesson, unit.title as unit, course.course_id, course.name as course, datetime FROM resolved_test INNER JOIN student ON resolved_test.student_id = student.student_id INNER JOIN test ON resolved_test. test_id = test.test_id INNER JOIN lesson ON lesson_lesson_id = lesson.lesson_id INNER JOIN unit ON lesson_unit_unit_id = unit.unit_id INNER JOIN course ON unit_course_course_id = course.course_id INNER JOIN user ON student.user_user_id = user.user_id WHERE unit.title = ? GROUP BY datetime LIMIT ?,?;", [data.unit, offset, elementsPerPage]);
  } else if (data.lesson !== null) {
    return pool.query("SELECT student.student_id, concat(user.name, ' ', user.lastName) as student, resolved_test.test_id, lesson.title as lesson, unit.title as unit, course.course_id, course.name as course, datetime FROM resolved_test INNER JOIN student ON resolved_test.student_id = student.student_id INNER JOIN test ON resolved_test. test_id = test.test_id INNER JOIN lesson ON lesson_lesson_id = lesson.lesson_id INNER JOIN unit ON lesson_unit_unit_id = unit.unit_id INNER JOIN course ON unit_course_course_id = course.course_id INNER JOIN user ON student.user_user_id = user.user_id WHERE lesson.title = ? GROUP BY datetime LIMIT ?,?;", [data.lesson, offset, elementsPerPage]);
  } else if (data.unit === null && data.lesson === null && data.course !== null) {
    return pool.query("SELECT student.student_id, concat(user.name, ' ', user.lastName) as student, resolved_test.test_id, lesson.title as lesson, unit.title as unit, course.course_id, course.name as course, datetime FROM resolved_test INNER JOIN student ON resolved_test.student_id = student.student_id INNER JOIN test ON resolved_test. test_id = test.test_id INNER JOIN lesson ON lesson_lesson_id = lesson.lesson_id INNER JOIN unit ON lesson_unit_unit_id = unit.unit_id INNER JOIN course ON unit_course_course_id = course.course_id INNER JOIN user ON student.user_user_id = user.user_id WHERE course.name = ? GROUP BY datetime LIMIT ?,?;", [data.course, offset, elementsPerPage]);
  }
}

coursesModel.insertResolvedTest = (newResolvedTest) => {
  return pool.query('INSERT INTO resolved_test (student_id, test_id, title, response) VALUES ?', [newResolvedTest.map(element => [element.student_id, element.test_id, element.title, element.response])]);
}

coursesModel.asignCourseToStudent = (asignment) => {
  return pool.query('INSERT INTO course_has_student set ?', [asignment]);
}

coursesModel.removeStudentFromCourse = (course_id, student_id) => {
  return pool.query('DELETE FROM `course_has_student` WHERE (`course_course_id` = ?) and (`student_student_id` = ?);', [course_id, student_id])
}

coursesModel.deleteCourse = (course_id) => {
  return pool.query('DELETE FROM `course` WHERE `course_id` = ?;', [course_id])
}

coursesModel.createTest = (state, course_id, unit_id, lesson_id, questions, callback) => {
  pool.getConnection((err, connection) => {
    connection.beginTransaction(err => {
      (err) ? console.log(err) : null;
      pool.query('INSERT INTO test (state, lesson_unit_course_course_id, lesson_unit_unit_id, lesson_lesson_id) VALUES (?)', [[state, course_id, unit_id, lesson_id]], async (newTestErr, newTest) => {
        if (newTestErr) {
          connection.rollback(() => {
            console.log(newTestErr);
            throw newTestErr;
          });
        }
        console.log({newTest});
        console.log('largo preguntas:', questions.length);
        for await (const question of questions) {
          pool.query('INSERT INTO question (title, type, test_test_id) VALUES (?)', [[question.title, question.type, newTest.insertId]], (newQuestionErr, newQuestion) => {
            if (newQuestionErr) {
              connection.rollback(() => {
                console.log(newQuestionErr);
                throw newQuestionErr;
              });
              console.log({newQuestion});
            }
            if (question.type !== 'text') {
              pool.query('INSERT INTO answer (title, question_question_id) VALUES (?)', [[question.answer_1, newQuestion.insertId]], (newAnswerErr, newAnswer) => {
                if (newAnswerErr) {
                  connection.rollback(() => {
                    console.log('error en answer', newAnswerErr);
                    throw newAnswerErr;
                  });
                }
              });
              pool.query('INSERT INTO answer (title, question_question_id) VALUES (?)', [[question.answer_2, newQuestion.insertId]], (newAnswerErr, newAnswer) => {
                if (newAnswerErr) {
                  connection.rollback(() => {
                    console.log('error en answer', newAnswerErr);
                    throw newAnswerErr;
                  });
                }              
              });
              pool.query('INSERT INTO answer (title, question_question_id) VALUES (?)', [[question.answer_3, newQuestion.insertId]], (newAnswerErr, newAnswer) => {
                if (newAnswerErr) {
                  connection.rollback(() => {
                    console.log('error en answer', newAnswerErr);
                    throw newAnswerErr;
                  });
                }              
              });
              pool.query('INSERT INTO answer (title, question_question_id) VALUES (?)', [[question.answer_4, newQuestion.insertId]], (newAnswerErr, newAnswer) => {
                if (newAnswerErr) {
                  connection.rollback(() => {
                    console.log('error en answer', newAnswerErr);
                    throw newAnswerErr;
                  });
                }              
              });
            }
          });
          if(question === questions[questions.length - 1]){
            connection.commit(err => {
              console.log('Commiting transaction.....')
              if (err) {
                  return connection.rollback(() => {
                      throw err;
                  })
              }
    
              console.log('Transaction Complete.');
              callback(null, true);
            });
          } 
        }
      });
    });
    connection.release();
  });
  
  /* pool.query('INSERT INTO test (state, lesson_unit_course_course_id, lesson_unit_unit_id, lesson_lesson_id) VALUES (?)', [[state, course_id, unit_id, lesson_id]])
    .then(async newTest => {
      console.log('id nuevo test:', test.insertId);
      for await (const question of questions) {
        pool.query('INSERT INTO question (title, type, test_test_id, test_lesson_unit_course_course_id, test_lesson_unit_unit_id, test_lesson_lesson_id) VALUES (?)', [[question.title, type, newTest.insertId, course_id, unit_id, lesson_id]])
          .then(newQuestion => {
            pool.query('INSERT INTO answer (title, question_question_id, question_test_test_id, question_test_lesson_unit_course_course_id, question_test_lesson_unit_unit_id, question_test_lesson_lesson_id) VALUES (?)', [[answer_1, question_id, newTest.insertId, course_id, unit_id, lesson_id]]);
            pool.query('INSERT INTO answer (title, question_question_id, question_test_test_id, question_test_lesson_unit_course_course_id, question_test_lesson_unit_unit_id, question_test_lesson_lesson_id) VALUES (?)', [[answer_2, question_id, newTest.insertId, course_id, unit_id, lesson_id]]);
            pool.query('INSERT INTO answer (title, question_question_id, question_test_test_id, question_test_lesson_unit_course_course_id, question_test_lesson_unit_unit_id, question_test_lesson_lesson_id) VALUES (?)', [[answer_3, question_id, newTest.insertId, course_id, unit_id, lesson_id]]);
            pool.query('INSERT INTO answer (title, question_question_id, question_test_test_id, question_test_lesson_unit_course_course_id, question_test_lesson_unit_unit_id, question_test_lesson_lesson_id) VALUES (?)', [[answer_4, question_id, newTest.insertId, course_id, unit_id, lesson_id]]);
          })
          .catch(err => {
            return err
          });
      }
      return 'ok'
    })
    .catch(err => {
      return err
    }); */
}

module.exports = coursesModel;