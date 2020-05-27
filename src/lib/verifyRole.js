const jwt = require('jsonwebtoken');
let verifyRole = {};

verifyRole.admin = function (req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken
    
    let userRole = jwt.verify(bearerToken, 'jwt-secret').userFound[0].rol;
    console.log('userRole:', userRole);
    if(userRole == 'admin'){
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
  console.log(bearerHeader);
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken
    
    let userRole = jwt.verify(bearerToken, 'jwt-secret').userFound[0].rol;
    console.log('userRole:', userRole);
    if(userRole == 'teacher' || userRole == 'admin'){
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
  console.log(bearerHeader);
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken
    
    let userRole = jwt.verify(bearerToken, 'jwt-secret').userFound[0].rol;
    console.log('userRole:', userRole);
    if(userRole == 'student' || userRole == 'teacher' || userRole == 'admin'){
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

verifyRole.getRequesterId = (req) => {
  console.log(req.headers['authorization'])
  const bearerHeader = req.headers['authorization'];
  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  req.token = bearerToken
  let decode = jwt.verify(bearerToken, 'jwt-secret');
  console.log(decode);
}

module.exports = verifyRole;