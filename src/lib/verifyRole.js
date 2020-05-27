const jwt = require('jsonwebtoken');
let verifyRole = {};

verifyRole.admin = function (req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken
    
    let userData = jwt.verify(bearerToken, 'jwt-secret').userFound[0];
    req.requester_id = userData.user_id;
    req.requester_role = userData.rol;
    if(userData.rol == 'admin'){
      next();
    }else {
      res.status(403).json({
        success: false,
        message: 'Route access denied.'
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'Route access denied.'
    });
  }
}

verifyRole.teacher = function (req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken
    
    let userData = jwt.verify(bearerToken, 'jwt-secret').userFound[0];
    req.requester_id = userData.user_id;
    req.requester_role = userData.rol;
    if(userData.rol == 'teacher' || userData.rol == 'admin'){
      next();
    }else {
      res.status(403).json({
        success: false,
        message: 'Route access denied.'
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'Route access denied.'
    });
  }
}

verifyRole.student = function (req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken
    
    let userData = jwt.verify(bearerToken, 'jwt-secret').userFound[0];
    req.requester_id = userData.user_id;
    req.requester_role = userData.rol;
    if(userData.rol == 'student' || userData.rol == 'teacher' || userData.rol == 'admin'){
      next();
    }else {
      res.status(403).json({
        success: false,
        message: 'Route access denied.'
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'Route access denied.'
    });
  }
}

module.exports = verifyRole;