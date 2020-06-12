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
router.get('/course/:course_id/unit/:unit_number/lesson/:lesson_number/resolvedTests', verifyRole.teacher, (req, res) => {
  coursesModel.getResolvedTestsByCourseId(req.params.course_id, req.params.unit_number, req.params.lesson_number)
    .then(resolvedTests => {
      res.status(200).json({
        success: true,
        message: `Resolved Test from lesson ${req.params.lesson_number} from ${req.params.unit_number} from course with id ${req.params.course_id}`,
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

// response test
router.post('/resolved_test/new', verifyRole.teacher, (req, res) => {
  const { test_id, lesson_id, unit_id, course_id, question_id, answer_id, studen_id } = req.body;
  const newResolvedTest = { 
    test_id, 
    lesson_id, 
    unit_id, 
    course_id, 
    question_id, 
    answer_id, studen_id
  }

  coursesModel.insertResolvedTest(newResolvedTest)
    .then(newResolvedTest => {
      res.status(200).json({
        success: true,
        message: `New resolved test received from studen with id ${studen_id}.`,
        newResolvedTest
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: `Error on insert new resolved test.`
      });
    });
})

module.exports = router;