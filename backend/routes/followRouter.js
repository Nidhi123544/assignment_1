var express=require('express')
var router=express.Router();
var followModel=require('../models/followModel')

router.post('/followuser', function (req, res, next) {
    try {
      return followModel.followUser(req.body) .then(data => {
        if (data) res.json(data);
      }).catch(error =>
        console.log(error));
  } catch (err) {
    console.log(err)
  }
  });

  router.delete('/delete/:followByEmailId/:followToEmailId', function (req, res, next) {
    try {
      return followModel.deleteFollower(req.params) .then(data => {
        if (data) res.json(data);
      }).catch(error =>
        console.log(error));
  } catch (err) {
    console.log(err)
  }
  });
  
  router.get('/fetching/:email/:pageNumber/:pageSize', function (req, res, next) {
    try {
      return followModel.followPendingAccept(req.params) .then(data => {
        if (data) res.json(data);
      }).catch(error =>
        console.log(error));
  } catch (err) {
    console.log(err)
  }
  });
  
  router.put('/acceptrequest', function (req, res, next) {
    try {
      return followModel.updateFollowRequest(req.body) .then(data => {
        if (data) res.json(data);
      }).catch(error =>
        console.log(error));
  } catch (err) {
    console.log(err)
  }
  });
  
  

module.exports = router; 