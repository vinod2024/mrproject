const express = require('express');

const router = express.Router();
const { signUpValidation, loginValidation, profileValidation } = require('../helpers/validation');
const userController = require('../controllers/userController');

const auth = require('../middleware/auth');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination:function(req, file, cb){
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename:function(req, file, cb){
    const name = Date.now() +'-'+ file.originalname;
    cb(null,name);
  }

});

const fileFilter = (req, file, cb) => {
  (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') ? cb(null, true) : cb(null, false);
}

const upload = multer({ 
  storage : storage,
  fileFilter: fileFilter
});

// Convert req.body to plain object
const parseBodyData = (req, res, next) => {
    req.body = { ...req.body };
    next();
  }

router.post('/register', signUpValidation, userController.register);
router.post('/login', loginValidation, userController.login);
// router.post('/login', loginValidation, userController.login);

router.get('/profile-data', auth.isAuthorise, userController.profileData);

router.post('/profile-update',    
  auth.isAuthorise,
  upload.single('profileimage'),
  parseBodyData,
  profileValidation,
  userController.profileUpdate);

module.exports = router;