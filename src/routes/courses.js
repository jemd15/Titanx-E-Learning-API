const express = require('express');
const router = express.Router();

const pool = require('../database');

// get courses
router.get('/', async (req, res) => {
  let courses = await pool.query('SELECT * FROM course');
  res.send(courses);
});

// crear curso
router.post('/new', async (req, res) => {
  const { school_id, name, img_url, teacher_teacher_id, teacher_user_user_id, teacher_school_school_id } = req.body;
  const newCourse = {
    school_id,
    name,
    img_url,
    teacher_teacher_id,
    teacher_user_user_id,
    teacher_school_school_id
  };

  await pool.query('INSERT INTO course set ?', [newCourse]);
  res.send('course created successfully', newCourse);
})

module.exports = router;