const express = require('express')
const multer = require('multer');
const router = express.Router();
const postModel = require('../models/postModel');



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

var fileFilter = (req, file, cb) => {
  //reject file
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'|| file.mimetype === 'image/svg+xml') { 
    cb(null, true); 
  }else { 
    cb(null, false); 
  }
}

var upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: fileFilter });


router.post('/create', upload.single('images'), function (req, res, next) {
  return postModel.createPost(req.body, req.file).then(data => {
    if (data) {
      res.json(data)
    } else {
      res.json(data)
    }
  })
});

router.get('/list/:email/:pageNumber/:pageSize', function (req, res, next) {
  return postModel.fetchPostByEmailId(req.params).then(data => {
    if (data) {
      res.json(data)
    } else {
      res.json(data)
    }
  })
});

router.get('/app/list/:pageNumber/:pageSize', function (req, res, next) {
  return postModel.fetchPosts(req.params).then(data => {
    if (data) {
      res.json(data)
    } else {
      res.json(data)
    }
  })
});

router.put('/likes', function (req, res, next) {
  return postModel.updatePostLike(req.body).then(data => {
    if (data) {
      res.json(data)
    } else {
      res.send("Server Error")
    }
  })
});

router.put('/comments', function (req, res, next) {
  return postModel.updateCommentPost(req.body).then(data => {
    if (data) {
      res.json(data)
    } else {
      res.send("Server Error")
    }
  })
});

router.delete('/delete/:postId', function (req, res, next) {
  console.log(req.params)
  return postModel.deletePost(req.params).then(data => {
    if (data) {
      res.json(data)
    } else {
      res.send("Server Error")
    }
  })
});

module.exports = router;
