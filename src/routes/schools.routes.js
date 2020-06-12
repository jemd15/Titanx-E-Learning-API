const express = require('express');
const router = express.Router();
const schoolsModel = require('../models/schools.models');
const verifyRole = require('../lib/verifyRole');

// get schools
router.get('/', verifyRole.admin, (req, res) => {
  schoolsModel.getSchools()
    .then(schools => {
      res.status(200).json({
        success: true,
        message: 'all schools.',
        schools
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

// create school
router.post('/new', verifyRole.admin, (req, res) => {
  const { name } = req.body;
  const school = {
    name
  };

  schoolsModel.createSchool(school)
    .then(newSchool => {
      res.status(200).json({
        success: true,
        message: 'School created successfully.',
        newSchool
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });  
})

module.exports = router;