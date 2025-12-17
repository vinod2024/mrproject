const { check } = require("express-validator");

exports.signUpValidation = [
  check('name')
    .notEmpty()
    .withMessage('Name is required'),

  check('email')
    .normalizeEmail({ gmail_remove_dots: true })
    .isEmail()
    .withMessage('Email is required'),

  check('password')
    .isLength({ min: 6 })
    .withMessage('Password is required')
];

exports.loginValidation = [
  check('email')
    .normalizeEmail({ gmail_remove_dots: true })
    .isEmail()
    .withMessage('Email is required'),

  check('password')
    .notEmpty()
    .withMessage('Password is required')
]

// profileValidation
exports.profileValidation = [
  check('name')
    .notEmpty()
    .withMessage('Name is required'),

  /* check('age')
    .notEmpty()
    .isNumeric()
    .withMessage('Enter age numeric value'), */

  check('age')
    .isInt({ min: 18, max: 60 })
    .withMessage('Age must be between 18 and 60'),  
  
    check('image')
    .custom((value, {req}) => {

      // ✅ If no file uploaded, skip validation
      if (!req.file) {
        return true;
      }
      
      if(req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/png'){
        return true;
      }else{
        return false;
      }
    }).withMessage('Please upload an image type png or jpeg')
];
