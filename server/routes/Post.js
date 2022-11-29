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
    Documents : `https://empty-test-project.herokuapp.com/images/${req.file.filename}`
  })

  await Post.save();
  res.send(Post);
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

    SosmedPostModel.findById({_id : Id}, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
    })
}

router.post("/socialmedia/post", upload.single('Documents'), createPost);
router.get("/socialmedia/post/email", getPostByEmail);
router.get("/socialmedia/post/:id", getPostById);

module.exports = router