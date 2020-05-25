const express = require('express');
const router = express.Router();
const pool = require('../database');

// get schools
router.get('/', async (req, res) => {
  let schools = await pool.query('SELECT * FROM school');
  res.send(schools);
})

// create school
router.post('/new', async (req, res) => {
  const { name } = req.body;
  const newSchool = {
    name
  };

  await pool.query('INSERT INTO school set ?', [newSchool]);
  res.send('school created successfully', newSchool);
})

module.exports = router;