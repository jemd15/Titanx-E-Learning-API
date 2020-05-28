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
  const { school_id, name, img_url, teacher_teacher_id, teacher_user_user_id, teacher_school_school_id } = req.body;
  const course = {
    school_id, name, img_url, teacher_teacher_id, teacher_user_user_id, teacher_school_school_id
  };

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

// get unit by course_id
/* router.get('/course/:course_id/units/', verifyRole.student, (req, res) => {
  coursesModel.getUnitByCourseId(req.params.unit_id)
    .then(unit => {
      res.status(200).json({
        success:true,
        message: `unit with id ${req.params.unit_id}.`,
        unit
      });
    })
    .catch(err => {
      res.status(500).json({
        success:false,
        message: `error on get unit with id ${req.params.unit_id}.`
      });
    });
}); */

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

// get lessons
/* router.get('/units/lessons', verifyRole.student, (req, res) => { 
  coursesModel.getLessonsByUnitId(req.params.unit_id)
    .then(lessons => {
      res.status(200).json({
        success: true,
        message: `Lessons from unit with id ${req.params.unit_id}`,
        lessons
      });
    })
    .catch(err => {
      res.status(500).json({
        success:false,
        message: `error on get lessons from unit with id ${req.params.unit_id}.`
      });
    });
}); */

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
  const { number, description, unit_unit_id, unit_course_course_id } = req.body;
  const lesson = {
    number, description, unit_unit_id, unit_course_course_id
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
  coursesModel.getActivityOfALesson(req.params.course_id, req.params.lesson_number, req.params.lesson_number)
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
router.get('/course/:course_id/unit/:unit_number/lesson/:lesson_id/activity/new', verifyRole.teacher, (req, res) => {
  const { number, description, type, url, lesson_lesson_id, lesson_unit_unit_id, lesson_unit_course_course_id } = req.body;
  const activity = {
    number, description, type, url, lesson_lesson_id, lesson_unit_unit_id, lesson_unit_course_course_id
  }

  coursesModel.createActivity(activity)
    .then(newActivity => {
      activity.activity_id = newActivity.insertId;
      res.status(200).json({
        success: true,
        message: `Activity create on unit with id ${req.params.lesson_id} sucessfully`,
        activity
      });
    })
    .catch(err => {
      res.status(500).json({
        success:false,
        message: `error on create activity on lesson with id ${req.params.lesson_id}.`
      });
    });
});

// get test by lesson_id
router.get('/course/:course_id/unit/:unit_number/lesson/:lesson_id/test', verifyRole.student, (req, res) => {
  coursesModel.getTestByLessonId(req.params.course_id, req.params.lesson_number, req.params.lesson_number)
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

module.exports = router;