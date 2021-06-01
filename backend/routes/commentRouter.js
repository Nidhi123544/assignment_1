var express=require('express')
var router=express.Router();
const commentModel=require('../models/commentModel');
//const { param } = require('.');


router.get('/fetch/:postId', function (req, res, next) {
    try {
        console.log(req.params)
      return commentModel.fetchPostComment(req.params).then(data => {
        if (data) {
          res.json(data)
        } else {
          res.json(data)
        }
      })
    } catch (error) {
      console.log(error)
    }
  });
// router.post('/create', function (req, res, next) {
//     try {
//         console.log(req.body)
//       return commentModel.createPost(req.body).then(data => {
//         if (data) {
//           res.json(data)
//         } else {
//           res.json(data)
//         }
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   });


//   router.put('/likes', function (req, res, next) {
//     try {
//       return commentModel.updatePostLike(req.body).then(data => {
//         if (data) {
//           res.json(data)
//         } else {
//           res.send("Server Error")
//         }
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   });

//   router.delete('/delete', function (req, res, next) {
//     try {
//       return commentModel.deletePost(req.body).then(data => {
//         if (data) {
//           res.json(data)
//         } else {
//           res.send("Server Error")
//         }
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }); 

module.exports = router;
