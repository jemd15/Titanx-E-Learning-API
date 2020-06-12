const pool = require('../database');

let authModel = {};

authModel.getUserByEmail = (email) => {
  return pool.query('SELECT user.*, teacher_id, student_id FROM user LEFT JOIN teacher ON user.user_id = teacher.user_user_id LEFT JOIN student ON user.user_id = student.user_user_id WHERE email = ?', [email]);
}

module.exports = authModel;