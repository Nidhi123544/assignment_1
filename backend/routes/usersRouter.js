var express = require('express');
var router = express.Router();
const multer = require('multer');
const userModel = require('../models/userModel');
const verifyToken = require('../models/verifyToken')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './profileImage/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

var fileFilter = (req, file, cb) => {
  //reject file
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/svg+xml') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

var upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: fileFilter });


router.post('/update/profile/picture', upload.single('profileImage'), function (req, res, next) {
  return userModel.updateProfileImage(req.body, req.file).then(data => {
    if (data) {
      res.json(data)
    } else {
      res.json(data)
    }
  })
});

//login api
router.post('/auth/check', verifyToken);

router.post('/login', function (req, res, next) {
  const { email, password } = req.body
  return userModel.loginUser({ email, password })
    .then(data => {
      if (data) res.json(data);
    }).catch(error =>
      console.log(error));
});
// register api 
router.post('/register', function (req, res, next) {
  return userModel.registerUser(req.body)
    .then(data => {
      if (data) res.json(data);
    }).catch(error =>
      console.log(error));
});
//update api
router.put('/put', function (req, res, next) {
  return userModel.putUser(req.body)
    .then(data => {
      if (data) res.json(data);
    }).catch(error =>
      console.log(error));
});


router.post('/reg', function (req, res, next) {
  return userModel.regUser()
    .then(data => {
      if (data) res.json(data);
    }).catch(error =>
      console.log(error));
});


router.get('/:email/:pageNumber/:pageSize', function (req, res, next) {
  return userModel.fetchAllUsers(req.params)
    .then(data => {
      if (data) res.json(data);
    }).catch(error =>
      console.log(error));
});


router.get('/friend/:email/:pageNumber/:pageSize', function (req, res, next) {
  return userModel.fetchAllFriend(req.params)
    .then(data => {
      if (data) res.json(data);
    }).catch(error =>
      console.log(error));
});

module.exports = router;
