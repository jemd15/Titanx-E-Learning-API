const pool = require('../database');
let moment = require('moment');
let usersModel = {};

usersModel.getUsers = () => {
  return pool.query('SELECT user.*, teacher_id, student_id FROM user LEFT JOIN teacher ON user.user_id=teacher.user_user_id LEFT JOIN student ON user.user_id=student.user_user_id;');
}

usersModel.getUsersQuantity = () => {
  return pool.query('SELECT count(*) as `user_quantity` FROM user;');
}

usersModel.getUsersWithPagination = (limit, offset) => {
  return pool.query('SELECT * FROM user LIMIT ? OFFSET ?;', [limit, offset]);
}

usersModel.getTeachers = () => {
  return pool.query('SELECT * FROM user WHERE rol = "teacher"');
}

usersModel.getStudents = () => {
  return pool.query('SELECT * FROM user WHERE rol = "student"');
}

usersModel.getAdmins = () => {
  return pool.query('SELECT * FROM user WHERE rol="admin"');
}

usersModel.createUser = (user) => { // transformar esto en transacción
  user.createdAt = moment().format('YYYY-MM-DD hh:mm:ss');
  return pool.query('INSERT INTO user set ?', [user])
    .then(userData => {
      console.log('userData:', userData)
      if(user.rol == 'teacher'){
        return pool.query('INSERT INTO teacher set ?', [{ user_user_id: userData.insertId, school_school_id: user.school_school_id }])
        .then((teacherData) => {
          teacherData.insertId = userData.insertId;
          return teacherData;
        })
        .catch(err => {
          return err;
        });
      } else if (user.rol == 'student') {
        return pool.query('INSERT INTO student set ?', [{ user_user_id: userData.insertId, school_school_id: user.school_school_id }])
        .then((studentData) => {
          studentData.insertId = userData.insertId;
          return studentData;
        })
        .catch(err => {
          return err;
        });
      } else if (user.rol == 'admin') {
        return userData;
      }else {
        return new Error('error al crear usuario');
      }
    })
    .catch(err => {
      // console.error(err.sqlMessage);
      return err;
    });
}

usersModel.getStudentsBySchoolId = (school_id) => {
  return pool.query("SELECT * FROM user INNER JOIN student ON user.user_id=student.user_user_id WHERE student.school_school_id=3 AND rol='student' ORDER BY name;", [school_id]);
}

usersModel.getStudentsByCourseId = (course_id) => {
  return pool.query('SELECT user.*, student.student_id FROM titanxcl_e_learning.course_has_student INNER JOIN student ON course_has_student.student_student_id=student.student_id INNER JOIN user ON student.user_user_id=user.user_id WHERE course_course_id=?;', [course_id]);
}

usersModel.changeState = (userChanges) => {
  return pool.query('UPDATE user SET state = ? WHERE user_id = ?', [userChanges.state, userChanges.user_id]);
}

module.exports = usersModel;