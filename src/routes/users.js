const express = require('express');
const router = express.Router();
const pool = require('../database');

// get users
router.get('/', async (req, res) => {
  let users = await pool.query('SELECT * FROM user');
  res.send(users);
})

// get teachers
router.get('/teachers', async (req, res) => {
  let users = await pool.query("SELECT * FROM user WHERE rol = 'teacher'");
  res.send(users);
})

// get students
router.get('/students', async (req, res) => {
  let users = await pool.query("SELECT * FROM user WHERE rol = 'student'");
  res.send(users);
})

// get admins
router.get('/admins', async (req, res) => {
  let users = await pool.query("SELECT * FROM user WHERE rol = 'admin'");
  res.send(users);
})

// create teacher
router.post('/new/teacher', async (req, res) => {
  const { name, lastName, email, password, rol, school_school_id } = req.body;
  const newUser = { name, lastName, email, password, rol }
  let newTeacher = {
    school_school_id
  };

  pool.getConnection((err, connection) => {

    connection.beginTransaction(async err => {
      if (err) {
        connection.rollback(() => {
          console.error('Error on create new teacher (28):', err.message);
          throw err;
        });
      }

      await pool.query('INSERT INTO user set ?', [newUser])
        .then(async res => {
          newTeacher.user_user_id = res.insertId;
          await pool.query('INSERT INTO teacher set ?', [newTeacher])
            .then(async res => {
              newTeacher.teacher_id = res.insertId;
              console.log('Commiting transaction...');
              connection.commit((err) => {
                if(err){
                  connection.rollback(() => {
                    console.error('Error on create new teacher (43):', err.sqlMessage);
                  });
                }
              })
            })
        })
        .then(() => {
          res.status(200).json({
            success: true,
            message: 'Teacher created successfully.',
            user: {
              user_id: newTeacher.user_user_id,
              name: newUser.name,
              lastName: newUser.lastName,
              email: newUser.email,
              rol: newUser.rol,
              teacher_id: newTeacher.teacher_id
            }
          })
        })
        .catch(err => {
          connection.rollback(() => {
            console.error('Error on create new teacher (65):', err.message);
          });
          res.status(500).json({
            success: false,
            message: err.message
          });
        });
    });

  });

});

// create student
router.post('/new/student', async (req, res) => {
  const {
    name, lastName, email, password, rol, school_school_id
  } = req.body;
  const newUser = {
    name, lastName, email, password, rol
  }
  const newStudent = {
    school_school_id
  };

  pool.getConnection((err, connection) => {

    connection.beginTransaction(async err => {
      if (err) {
        connection.rollback(() => {
          console.error('Error on create new student (28):', err.message);
          throw err;
        });
      }

      await pool.query('INSERT INTO user set ?', [newUser])
        .then(async res => {
          newTeacher.user_user_id = res.insertId;
          await pool.query('INSERT INTO student set ?', [newStudent])
            .then(async res => {
              newStudent.student_id = res.insertId;
              console.log('Commiting transaction...');
              connection.commit((err) => {
                if(err){
                  connection.rollback(() => {
                    console.error('Error on create new student (43):', err.sqlMessage);
                  });
                }
              })
            })
        })
        .then(() => {
          res.status(200).json({
            success: true,
            message: 'Student created successfully.',
            user: {
              user_id: newStudent.user_user_id,
              name: newUser.name,
              lastName: newUser.lastName,
              email: newUser.email,
              rol: newUser.rol,
              student_id: newStudent.student_id
            }
          })
        })
        .catch(err => {
          connection.rollback(() => {
            console.error('Error on create new student (65):', err.message);
          });
          res.status(500).json({
            success: false,
            message: err.message
          });
        });
    });

  });
});

// create admin
router.post('/new/admin', async (req, res) => {
  const {
    name, lastName, email, password, rol
  } = req.body;
  const newUser = {
    name, lastName, email, password, rol
  }
  let user_id;

  pool.getConnection((err, connection) => {

    connection.beginTransaction(async err => {
      if (err) {
        connection.rollback(() => {
          console.error('Error on create new teacher (28):', err.message);
          throw err;
        });
      }

      await pool.query('INSERT INTO user set ?', [newUser])
        .then(async res => {
          user_id = res.insertId;
          console.log('Commiting transaction...');
          connection.commit((err) => {
            if(err){
              connection.rollback(() => {
                console.error('Error on create new administrator (43):', err.sqlMessage);
              });
            }
          })
        })
        .then(() => {
          res.status(200).json({
            success: true,
            message: 'Administrator created successfully.',
            user: {
              user_id: user_id,
              name: newUser.name,
              lastName: newUser.lastName,
              email: newUser.email,
              rol: newUser.rol
            }
          })
        })
        .catch(err => {
          connection.rollback(() => {
            console.error('Error on create new administrator (65):', err.message);
          });
          res.status(500).json({
            success: false,
            message: err.message
          });
        });
    });

  });
});

module.exports = router;