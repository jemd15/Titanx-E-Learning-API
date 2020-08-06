const express = require('express');
const router = express.Router();
const usersModel = require('../models/users.models');
const helpers = require('../lib/helpers');
const verifyRole = require('../lib/verifyRole');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const authModel = require('../models/auth.models');

// get users
router.get('/', verifyRole.admin, (req, res) => {
  usersModel.getUsers()
    .then(users => {
      users.forEach(user => {
        delete user['password']
      });
      res.status(200).json({
        success: true,
        message: 'all users.',
        users
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

// post users with pagination
router.post('/', verifyRole.admin, (req, res) => {
  const {
    page,
    limit
  } = req.body;
  const pagination = {
    limit,
    page
  };

  usersModel.getUsersQuantity()
    .then(usersQuantity => {
      let pages = Math.ceil(usersQuantity[0].user_quantity / pagination.limit);
      console.log('getUsersWithPagination', pagination.limit, (pagination.page * pagination.limit) - 1);

      usersModel.getUsersWithPagination(pagination.limit, (pagination.page - 1) * pagination.limit)
        .then(users => {
          res.status(200).json({
            success: true,
            message: `Users page ${pagination.page}`,
            users,
            pages
          });
        })
        .catch(err => {
          res.status(500).json({
            success: false,
            message: 'Error on get usars paginated'
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: `Error on get users page ${pagination.page}`
      });
    });
});

// get teachers
router.get('/teachers', verifyRole.admin, (req, res) => {
  usersModel.getTeachers()
    .then(teachers => {
      teachers.forEach(teacher => {
        delete teacher['password']
      });
      res.status(200).json({
        success: true,
        message: 'all teachers.',
        teachers
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

// get students
router.get('/students', verifyRole.teacher, (req, res) => {
  usersModel.getStudents()
    .then(students => {
      students.forEach(student => {
        delete student['password']
      });
      res.status(200).json({
        success: true,
        message: 'all students.',
        students
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

// get students by schoolId
router.get('/school/:school_id', verifyRole.teacher, (req, res) => {
  usersModel.getStudentsBySchoolId(req.params.school_id)
    .then(students => {
      res.status(200).json({
        success: true,
        message: `Students from school with id = ${req.params.school_id}`,
        students
      });
    })
    .catch(err => {
      res.send(500).json({
        success: false,
        message: `Error on getStudentsBySchoolId`
      });
    });
});

// get students by courseId
router.get('/course/:course_id', verifyRole.teacher, (req, res) => {
  usersModel.getStudentsByCourseId(req.params.course_id)
    .then(students => {
      res.status(200).json({
        success: true,
        message: `Students from course with id = ${req.params.course_id}`,
        students
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: `Error on getStudentsByCourseId`,
        err
      });
    });
});

// get admins
router.get('/admins', verifyRole.admin, (req, res) => {
  usersModel.getAdmins()
    .then(admins => {
      admins.forEach(admin => {
        delete admin['password']
      });
      res.status(200).json({
        success: true,
        message: 'all admins.',
        admins
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
});

// create user
router.post('/new', verifyRole.teacher, async (req, res) => {
  const {
    name,
    lastName,
    email,
    password,
    rol,
    school_school_id
  } = req.body;
  const user = {
    name,
    lastName,
    email,
    password,
    rol,
    school_school_id,
    state: 'active'
  }
  const token = jwt.sign({ name: user.name, lastName: user.lastName, email: user.email, tokenType: 'verifyEmail' }, 'jwt-secret'); // cambiar por secret variable de entorno
  const link = 'https://e-learning.titanx.cl/#/verify-email/' + token;

  console.log('Creando nuevo usuario');
  user.password = await helpers.encyptPassword(user.password);

  contentHTML = `
  <!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

  <head>
    <title> </title>
    <!--[if !mso]><!-- -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      #outlook a {
        padding: 0;
      }

      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table,
      td {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }

      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      p {
        display: block;
        margin: 13px 0;
      }
    </style>
    <!--[if mso]>
          <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
    <!--[if lte mso 11]>
          <style type="text/css">
            .mj-outlook-group-fix { width:100% !important; }
          </style>
          <![endif]-->
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
    <style type="text/css">
      @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
    </style>
    <!--<![endif]-->
    <style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
      }
    </style>
    <style type="text/css">
      @media only screen and (max-width:480px) {
        table.mj-full-width-mobile {
          width: 100% !important;
        }

        td.mj-full-width-mobile {
          width: auto !important;
        }
      }
    </style>
  </head>

  <body style="background-color:#f5f5f5;">
    <div style="background-color:#f5f5f5;">
      <!--[if mso | IE]>
        <table
          align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
        >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
        <![endif]-->
      <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
          style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
                <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  
          <tr>
        
              <td
                class="" style="vertical-align:top;width:600px;"
              >
            <![endif]-->
                <div class="mj-column-per-100 mj-outlook-group-fix"
                  style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                    <tbody>
                      <tr>
                        <td style="vertical-align:top;padding:0px;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                            <tr>
                              <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                  style="border-collapse:collapse;border-spacing:0px;">
                                  <tbody>
                                    <tr>
                                      <td style="width:600px;"> <img alt="USS eLearning" height="auto"
                                          src="https://e-learning.titanx.cl/api/imgs/email-header.png"
                                          style="position: retalive; margin: 0 auto; background-size: cover; background-position: center; border: 0; display: block; outline: none; text-decoration: none; height: auto; font-size: 13px; width: 100%;"
                                          width="600"> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]>
              </td>
            
          </tr>
        
                    </table>
                  <![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        
        <table
          align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
        >
          <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
        <![endif]-->
      <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
          style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:0px;padding-bottom:20px;padding-top:10px;text-align:center;">
                <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  
          <tr>
        
              <td
                class="" style="vertical-align:top;width:600px;"
              >
            <![endif]-->
                <div class="mj-column-per-100 mj-outlook-group-fix"
                  style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                    <tbody>
                      <tr>
                        <td style="vertical-align:top;padding:0px;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                            <tr>
                              <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                <div
                                  style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:20px;line-height:1;text-align:left;color:#1a232f;">
                                  <strong>Estimado ${name} ${lastName},</strong></div>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="font-size:0px;padding:0 25px;word-break:break-word;">
                                <div
                                  style="font-family:Arial;font-size:18px;line-height:1;text-align:left;color:#000000;">
                                  <br><br> Bienvenido a la plataforma de e-learning Titanx. Se a creado una cuenta para
                                  este servicio con las siguientes credenciales: <br><br> email: <strong>${email}</strong>
                                  <br><br> contraseña: <strong>${password}</strong> <br><br> Ingrese al siguiente link
                                  para verificar su cuenta: <br><br></div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" vertical-align="middle"
                                style="font-size:0px;padding:20px 0 0 0;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                  style="border-collapse:separate;line-height:100%;">
                                  <tr>
                                    <td align="center" bgcolor="#1a232f" role="presentation"
                                      style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#1a232f;"
                                      valign="middle"> <a href="${link}"
                                        style="display: inline-block; background: #1a232f; color: #ffffff; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 120%; margin: 0; text-transform: none; padding: 10px 25px; mso-padding-alt: 0px; border-radius: 3px; text-decoration: none;"
                                        target="_blank">
                                        VERIFICAR CUENTA
                                      </a> </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center"
                                style="font-size:0px;padding:0 25px;padding-top:40px;word-break:break-word;">
                                <div
                                  style="font-family:Arial, sans-serif;font-size:14px;line-height:1;text-align:center;color:#000000;">
                                  <hr>
                                  <p>Este mail ha sido generado automáticamente. Por favor no responder.</p>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]>
              </td>
            
          </tr>
        
                    </table>
                  <![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]>
            </td>
          </tr>
        </table>
        <![endif]-->
    </div>
  </body>

  </html>
  `

  usersModel.createUser(user)
    .then(newUser => {
      console.log({
        newUser: newUser.code
      })
      if (newUser.code == 'ER_DUP_ENTRY') {
        console.log(newUser)
        res.status(500).json({
          success: false,
          message: newUser.sqlMessage
        });
      } else {

        // enviando mail con credenciales al nuevo usuario
        const transporter = nodemailer.createTransport({
          host: 'mail.titanx.cl',
          port: 587,
          secure: false,
          auth: {
            user: 'soporte-e-learning@titanx.cl',
            pass: '4397carlos',
          },
          tls: {
            rejectUnauthorized: false
          }
        });
      
        const info = transporter.sendMail({
          from: "Titanx E-Learning <soporte-e-learning@titanx.cl>",
          to: email,
          subject: 'Bienvenido a Titanx E-Learning',
          html: contentHTML
        });
      
        info
          .then(() => {
            console.log('Email enviado', info);
          })
          .catch(err => {
            console.log('Error al enviar email', error);
          });

        user.user_id = newUser.insertId;
        delete user['password'];
        res.status(200).json({
          success: true,
          message: 'User created successfully.',
          newUser: user
        });
      }

    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.sqlMessage
      });
    });
});

// change estate
router.put('/change-state', verifyRole.admin, (req, res) => {
  const {
    user_id,
    state
  } = req.body;
  const userChanges = {
    user_id,
    state
  };

  usersModel.changeState(userChanges)
    .then(changes => {
      res.status(200).json({
        success: true,
        message: 'User state updated correctly',
        changes
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.sqlMessage
      });
    });
});

// verifying the email with token
router.post('/verify-email', async (req, res) => {
  const { token } = req.body;
  
  jwt.verify(token, 'jwt-secret', function (err, decoded) {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Error on verify email.'
      });
    } else {
      if (decoded.tokenType = 'verifyEmail') {
        console.log('token email', decoded.email);
        usersModel.verifyUser(decoded.email)
          .then(() => {
            res.status(200).json({
              success: true,
              message: 'Email verified.',
              decoded
            });
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              message: 'Error on verify email on db.'
            });
          });
      } else {
        res.status(500).json({
          success: false,
          message: 'Token not valid.'
        });
      }
    }
  });
});

// update user data
router.put('/update', verifyRole.student, (req, res) => {
  const { user_id, name, lastName, email, newEmail } = req.body;
  const userNewData = { user_id, name, lastName, email, newEmail };

  usersModel.updateUserData(userNewData)
    .then(data => {
      if (data.affectedRows == 0) {
        throw new Error ('Affected rows matched: 0');
      }
      res.status(200).json({
        success: true,
        message: 'Data correctly actualized.'
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: 'User not found.'
      });
    });
});

// change user password
router.put('/change-pass', verifyRole.student, (req, res) => {
  const { user_id, password, newPassword, email } = req.body;
  const newUserData = { user_id, password, newPassword, email };

  authModel.getUserByEmail(newUserData.email)
  .then(userFound => {
      console.log({newUserData, userFound: userFound[0]})
      helpers.matchPassword(newUserData.password, userFound[0].password)
        .then(async passMatch => {
          newUserData.newPassword = await helpers.encyptPassword(newUserData.newPassword);
          usersModel.changeUserPass(newUserData)
            .then(() => {
              if (!passMatch) throw new Error('Password not match.');
              res.status(200).json({
                success: true,
                message: 'Password correctly actualized.'
              });
            })
            .catch(error => {
              res.status(500).json({
                success: false,
                message: 'Error on save new password.',
                error
              });
            });
        })
        .catch(err => {
          res.status(200).json({
            success: false,
            message: 'Current password is wrong.'
          });
        });
    })
    .catch(error => {
      console.log({error});
      
      res.status(500).json({
        success: false,
        message: 'User not found.',
        error
      });
    });
});

module.exports = router;