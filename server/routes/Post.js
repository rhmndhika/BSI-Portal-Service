const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');

const SosmedPostModel = require("../models/SosmedPost");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() +  path.extname(file.originalname))
  }
});

const upload = multer({storage: storage});

const createPost = async (req, res) => {
  
  const Post = new SosmedPostModel({
    Username : req.body.Username,
    Title : req.body.Title,
    Content : req.body.Content,
    Documents : `https://bsi-portal-service-production.up.railway.app/images/${req.file.filename}`
  })

//  const post = await Post.save().then((result) => {
//     SosmedPostModel.populate(Post, { path : "PostedBy"}).then((comments => {
//       res.send(post)
//     }))
//   })

 await Post.save();

 SosmedPostModel.find({ Username : req.session.email }).populate('PostedBy').exec(function (err, story) {
  if (err) return handleError(err);
  res.json({
    Post,
    story
  })
});
}

const getAllPost = (req, res) => {
    
    SosmedPostModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result)
        }
    })
}

const getPostByEmail = (req, res) => {

    SosmedPostModel.find({Username : req.session.email}, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
    })
}


const getPostById = (req, res) => {
    const Id = req.params.id;

   SosmedPostModel.find({ _id: Id }).populate('PostedBy').exec(function (err, story) {
      if (err) return handleError(err);
      res.send(story)
    });
}

const deletePostById = (req, res) => {
  const Id = req.params.id;

  SosmedPostModel.findByIdAndDelete({_id : Id}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
}

router.post("/socialmedia/post", upload.single('Documents'), createPost);
router.get("/socialmedia/post/all", getAllPost);
router.get("/socialmedia/post/email", getPostByEmail);
router.get("/socialmedia/post/:id", getPostById);
router.delete("/socialmedia/post/delete/:id", deletePostById);

module.exports = router