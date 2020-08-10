const express = require('express');
const router = express.Router();
const coursesModel = require('../models/courses.models');
const verifyRole = require('../lib/verifyRole');

// get courses
router.get('/courses', verifyRole.student, (req, res) => {
  coursesModel.getCourses(req.requester_id, req.requester_role)
    .then(courses => {
      res.status(200).json({
        success: true,
        message: 'all courses.',
        courses
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

// get course by id
router.get('/course/:course_id', verifyRole.student, (req, res) => {
  coursesModel.getCourseById(req.params.course_id)
    .then(course => {
      res.status(200).json({
        success: true,
        message: `Course with id ${req.params.course_id}`,
        course
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

// create course
router.post('/course/new', verifyRole.teacher, (req, res) => {
  const { school_id, name, img_url, teacher_teacher_id } = req.body;
  const course = {
    school_id, 
    name, 
    img_url,
    teacher_teacher_id,
    teacher_school_school_id: school_id
  };

  console.log('1)', course);
  
  coursesModel.createCourse(course)
  .then(newCourse => {
    course.course_id = newCourse.insertId;
    res.status(200).json({
      success: true,
      message: 'Course created successfully.',
      newCourse: course
    });
  })
  .catch(err => {
      console.log('2)', err.sqlMessage);
      res.status(500).json({
        success: false,
        message: err.sqlMessage
      });
    });
});

// get units
router.get('/course/:course_id/units', verifyRole.student, (req, res) => {
  coursesModel.getUnitsByCourseId(req.params.course_id)
    .then(units => {
      res.status(200).json({
        success:true,
        message: `units from course with id ${req.params.course_id}.`,
        units
      });
    })
    .catch(err => {
      res.status(500).json({
        success:false,
        message: `error on get units from course with id ${req.params.course_id}.`
      });
    });
});

// create unit
router.post('/course/:course_id/unit/new', verifyRole.teacher, (req, res) => {
  const { number, title, description, state, course_course_id } = req.body;
  const unit = {
    number, title, description, state, course_course_id
  };

  coursesModel.createUnit(unit)
    .then(newUnit => {
      unit.unit_id = newUnit.insertId;
      res.status(200).json({
        success:true,
        message: `Unit created on course with id ${req.params.course_id} successfully.`,
        unit
      });
    })
    .catch(err => {
      res.status(500).json({
        success:false,
        message: `error on create unit on course with id ${req.params.course_id}.`
      });
    });
});

// get lesson by unit_id
router.get('/unit/:unit_id/lessons', verifyRole.student, (req, res) => {
  coursesModel.getLessonsByUnitId(req.params.unit_id)
    .then(lessons => {
      res.status(200).json({
        success:true,
        message: `lessons from unit with id ${req.params.unit_id}.`,
        lessons
      });
    })
    .catch(err => {
      res.status(500).json({
        success:false,
        message: `error on get lessons from unit with id ${req.params.unit_id}.`
      });
    });
});

// create lesson
router.post('/unit/:unit_id/lesson/new', verifyRole.teacher, (req, res) => {
  const { number, unit_unit_id, unit_course_course_id, title } = req.body;
  const lesson = {
    number, unit_unit_id, unit_course_course_id, title
  };

  coursesModel.createLesson(lesson)
    .then(newLesson => {
      lesson.lesson_id = newLesson.insertId;
      res.status(200).json({
        success:true,
        message: `Lesson created on unit with id ${req.params.unit_id} successfully.`,
        lesson
      });
    })
    .catch(err => {
      res.status(500).json({
        success:false,
        message: `error on create lesson on unit with id ${req.params.unit_id}.`
      });
    });
});

// get activities
router.get('/lesson/:lesson_id/activities', verifyRole.student, (req, res) => {
  coursesModel.getActivitysByLessonId(req.params.lesson_id)
    .then(activities => {
      res.status(200).json({
        success: true,
        message: `Activitys from lesson with id ${req.params.lesson_id}`,
        activities
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: `error on get activities from lesson with id ${req.params.lesson_id}`
      });
    });
});

// get activity by course_id, unit_number and lesson_number
router.get('/course/:course_id/unit/:unit_number/lesson/:lesson_number/activities', verifyRole.student, (req, res) => {
  coursesModel.getActivityOfALesson(req.params.course_id, req.params.unit_number, req.params.lesson_number)
    .then(activities => {
      res.status(200).json({
        success:true,
        message: `activities from lesson ${req.params.lesson_number} from unit ${req.params.unit_number} from course with id ${req.params.course_id}.`,
        activities
      });
    })
    .catch(err => {
      res.status(500).json({
        success:false,
        message: `error on get activities.`
      });
    });
});

// create activity
router.post('/course/:course_id/unit/:unit_number/lesson/:lesson_number/activity/new', verifyRole.teacher, (req, res) => {
  const { number, title, description, type, url } = req.body;
  let activity = {
    number,
    title,
    description,
    type,
    url
  }

  coursesModel.getLessonByCourseId(req.params.course_id, req.params.unit_number, req.params.lesson_number)
    .then(lesson => {
      activity.lesson_lesson_id = lesson[0].lesson_id;
      activity.lesson_unit_unit_id = lesson[0].unit_unit_id;
      activity.lesson_unit_course_course_id = lesson[0].unit_course_course_id;

      coursesModel.createActivity(activity)
        .then(newActivity => {
          activity.activity_id = newActivity.insertId;
          res.status(200).json({
            success: true,
            message: `Activity create on lesson ${req.params.lesson_number} sucessfully`,
            activity
          });
        })
        .catch(err => {
          res.status(500).json({
            success:false,
            message: `error on create activity on lesson ${req.params.lesson_number}.`
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        success:false,
        message: `error on create activity on lesson ${req.params.lesson_number}.`
      });
    });
});

// get test by course_id
router.get('/course/:course_id/unit/:unit_number/lesson/:lesson_number/test', verifyRole.student, (req, res) => {
  coursesModel.getTestByCourseId(req.params.course_id, req.params.unit_number, req.params.lesson_number)
    .then(test => {
      res.status(200).json({
        success:true,
        message: `Test from lesson ${req.params.lesson_number} from unit ${req.params.unit_number} from course with id ${req.params.course_id}.`,
        test
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      })
    })
});

// get questions by test_id
router.get('/test/:test_id/questions', verifyRole.student, (req, res) => {
  console.log('get questions by test_id =', req.params.test_id)
  coursesModel.getQuestionsByTestId(req.params.test_id)
    .then(questions => {
      console.log('questions', questions)
      res.status(200).json({
        success:true,
        message: `Questions from test with id ${req.params.test_id}`,
        questions
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

// get answers by question_id
router.get('/question/:question_id/answers', verifyRole.student, (req, res) => {
  coursesModel.getAnswersByQuestionId(req.params.question_id)
    .then(answers => {
      res.status(200).json({
        success:true,
        message: `Answers from question with id ${req.params.question_id}`,
        answers
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

// get resolved test by course_id
router.get('/course/:course_id/resolvedTests', verifyRole.teacher, (req, res) => {
  const course_id = req.params.course_id
  console.log(course_id);

  coursesModel.getResolvedTestsByCourseId(course_id)
    .then(resolvedTests => {
      res.status(200).json({
        success: true,
        message: `Resolved Test from course with id ${course_id}`,
        resolvedTests
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: `Error on getResolvedTestsByCourseId`
      });
    });
});

// get resolved test by course_id *** Paginated ***
router.get('/courses/resolvedTests/page/:page', verifyRole.teacher, (req, res) => {
  const { page } = req.params;
  const elementsPerPage = 10;

  coursesModel.getTotalPagesOfResolvedTests()
    .then(resolvedTests => {
      pages = Math.ceil(resolvedTests.length / elementsPerPage) ;
      coursesModel.getResolvedTests(page, elementsPerPage)
        .then(resolvedTests => {
          res.status(200).json({
            success: true,
            message: `Resolved Test page ${page}`,
            resolvedTests,
            pages
          });
        })
        .catch(err => {
          res.status(500).json({
            success: false,
            message: `Error on getResolvedTests`
          });
        });
    })
});

// search resolved test *** Paginated ***
router.post('/courses/searchResolvedTests/page/:page', verifyRole.teacher, (req, res) => {
  const { page } = req.params;
  const { course, unit, lesson } = req.body;
  const data = {
    course,
    unit,
    lesson
  }
  const elementsPerPage = 10;

  coursesModel.searchTotalPagesOfResolvedTests(data)
    .then(resolvedTests => {
      pages = Math.ceil(resolvedTests.length / elementsPerPage) ;
      coursesModel.searchResolvedTests(page, elementsPerPage, data)
        .then(resolvedTests => {
          res.status(200).json({
            success: true,
            message: `Resolved Test page ${page}`,
            resolvedTests,
            pages
          });
        })
        .catch(err => {
          res.status(500).json({
            success: false,
            message: `Error on searchResolvedTests`
          });
        });
    })
});

// resolved test detail
router.get('/courses/resolvedTestsDetail/student/:student_id/test/:test_id', verifyRole.teacher, (req, res) => {
  const { student_id, test_id } = req.params;
  const data = {
    student_id,
    test_id
  }

  coursesModel.getResolvedTestsDetail(data.student_id, data.test_id)
    .then(resolvedTests => {
      res.status(200).json({
        success: true,
        message: `Resolved Test Detail, student: ${data.student_id}, test: ${data.test_id}`,
        resolvedTests
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: `Error on getResolvedTestsDetail`
      });
    });
});

// download resolved test
router.post('/courses/searchResolvedTests/', verifyRole.teacher, (req, res) => {
  const { course, unit, lesson } = req.body;
  const data = {
    course,
    unit,
    lesson
  }

  coursesModel.downloadResolvedTests(data)
    .then(resolvedTests => {
      res.status(200).json({
        success: true,
        message: `Resolved Tests from: ${course}, ${unit}, ${lesson}`,
        resolvedTests
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: `Error on downloadResolvedTests`
      });
    });
});

// response test
router.post('/courses/resolved_test/new', verifyRole.student, (req, res) => {
  const { test } = req.body;
  const newResolvedTest = test;
  for (let element of newResolvedTest) {
    delete element.answer_1
    delete element.answer_2
    delete element.answer_3
    delete element.answer_4
    delete element.type
  }
  
  coursesModel.getResolvedTestsByTestIdAndStudentId(newResolvedTest[0].test_id, newResolvedTest[0].student_id)
    .then(test => {
      if (test.length > 0) {
        res.status(400).json({
          success: false,
          message: 'You cannot responce the tests twice.'
        });
      } else {
        coursesModel.insertResolvedTest(newResolvedTest)
          .then(newResolvedTest => {
            res.status(200).json({
              success: true,
              message: `New resolved test received correctly.`,
              newResolvedTest
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              success: false,
              message: `Error on insert new resolved test.`,
              err: err
            });
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: `Error on insert new resolved test.`,
        err: err
      });
    });
});

// asign course to student
router.post('/course/add-student', verifyRole.teacher, (req, res) => {
  const { course_id, student_id, school_id } = req.body;
  const data = {
    course_course_id: course_id, 
    student_student_id: student_id, 
    student_school_school_id: school_id
  };  

  coursesModel.asignCourseToStudent(data)
    .then(newAsignment => {
      res.status(200).json({
        success: true,
        message: `Student asign to course with id ${data.course_id}`,
        newAsignment
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: `Error to asign student to course with id ${data.course_id}`,
        err: err.sqlMessage
      });
    });
});

// remove student from a course
router.delete('/course/:courseId/student/:studentId/remove-student', verifyRole.teacher, (req, res) => {
  let course_id = req.params.courseId
  let student_id = req.params.studentId

  coursesModel.removeStudentFromCourse(course_id, student_id)
    .then(data => {
      res.status(200).json({
        success: true,
        message: "Student removed successfully",
        removed: data
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        success: false,
        message: "Error on remove student",
        err: err.sqlMessage
      });
    });
});

// remove course
router.delete('/course/:courseId/delete', verifyRole.teacher, (req, res) => {
  let course_id = req.params.courseId

  coursesModel.deleteCourse(course_id)
    .then(data => {
      res.status(200).json({
        success: true,
        message: "Course deleted successfully"
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        success: false,
        message: "Error on deleteCourse",
        err: err.sqlMessage
      });
    });
});

// create new test
router.post('/courses/newTest', verifyRole.teacher, (req, res) => {
  const { state, course_id, unit_id, lesson_id, questions } = req.body;

  coursesModel.getTestByLessonId(lesson_id)
    .then(test => {
      console.log('test.length:', test.length, {test});
      if (test) {
        res.status(500).json({
          success: false,
          message: 'You cannot duplicate or make another tests on this lesson'
        });
      } else {
        let createTest = new Promise((resolve, reject) => {
          coursesModel.createTest(state, course_id, unit_id, lesson_id, questions, (err, res) => {
            if (!err) {
              return resolve(true)
          } else {
              reject(new Error('Error on createTest'))
          }
          })
        });
      
        createTest
          .then((resolved, rejected) => {
            console.log(resolved, rejected);
            res.status(200).json({
              success: true,
              message: 'Test created successfully'
            });
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              message: 'Error on createTest',
              err
            });
          });
      }
      
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: 'Error on getTestByLessonId',
        err
      });
    });
});

module.exports = router;