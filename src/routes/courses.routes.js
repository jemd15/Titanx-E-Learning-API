const express = require('express');
const router = express.Router();
const coursesModel = require('../models/courses.models');

// get courses
router.get('/', (req, res) => {
  coursesModel.getCourses()
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
router.get('/:course_id', (req, res) => {
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
router.post('/new', (req, res) => {
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
router.get('/:course_id/units', (req, res) => {
  coursesModel.getUnitsByCourseId(req.params.course_id)
    .then(units => {
      res.status(200).json({
        success:true,
        message: `all units from course with id ${req.params.course_id}.`,
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

// get unit by id
router.get('/:course_id/units/:unit_id', (req, res) => {
  coursesModel.getUnitById(req.params.unit_id)
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
});

// create unit
router.post('/:course_id/units/new', (req, res) => {
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
router.get('/:course_id/units/:unit_id/lessons', (req, res) => { 
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
});

// get lesson by id
router.get('/:course_id/units/:unit_id/lessons/:lesson_id', (req, res) => {
  coursesModel.getLessonById(req.params.lesson_id)
    .then(lesson => {
      res.status(200).json({
        success:true,
        message: `lesson with id ${req.params.lesson_id}.`,
        lesson
      });
    })
    .catch(err => {
      res.status(500).json({
        success:false,
        message: `error on get lesson with id ${req.params.lesson_id}.`
      });
    });
});

// create lesson
router.post('/:course_id/units/:unit_id/lessons/new', (req, res) => {
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

// get activitys
router.get('/:course_id/units/:unit_id/lessons/:lesson_id/activitys', (req, res) => {
  coursesModel.getActivitysByLessonId(req.params.lesson_id)
    .then(activitys => {
      res.status(200).json({
        success: true,
        message: `Activitys from lesson with id ${req.params.lesson_id}`,
        activitys
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: `error on get activitys from lesson with id ${req.params.lesson_id}`
      });
    });
});

// get activity by id
router.get('/:course_id/units/:unit_id/lessons/:lesson_id/activitys/:activity_id', (req, res) => {
  coursesModel.getActivityById(req.params.activity_id)
    .then(activity => {
      res.status(200).json({
        success:true,
        message: `activity with id ${req.params.activity_id}.`,
        activity
      });
    })
    .catch(err => {
      res.status(500).json({
        success:false,
        message: `error on get activity with id ${req.params.activity_id}.`
      });
    });
});

// create activity
router.get('/:course_id/units/:unit_id/lessons/:lesson_id/activitys/new', (req, res) => {
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

module.exports = router;