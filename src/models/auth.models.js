const pool = require('../database');

let authModel = {};

authModel.getUserByEmail = (email) => {
  return pool.query('SELECT * FROM user WHERE email = ?', [email]);
}

module.exports = authModel;