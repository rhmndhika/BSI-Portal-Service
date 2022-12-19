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

  // const Post = new SosmedPostModel({
  //   Username : req.body.Username,
  //   Title : req.body.Title,
  //   Content : req.body.Content,
  //   Documents : `https://bsi-portal-service-production.up.railway.app/images/${req.file.filename}`
  // })
  // await Post.save();
  // res.send(Post);
  try {
  if (req.file) {
    const Post = new SosmedPostModel({
      Username : req.body.Username,
      Title : req.body.Title,
      Content : req.body.Content,
      Documents : `https://bsi-portal-service-production.up.railway.app/images/${req.file.filename}`,
      Author : req.body.Author
    })
    await Post.save();
    res.send(Post);
  } else {
    const Post = new SosmedPostModel({
      Username : req.body.Username,
      Title : req.body.Title,
      Content : req.body.Content,
      Author : req.body.Author
    })
    await Post.save();
    res.send(Post);
  }
  } catch (err) {
    console.log(err);
  }
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


const getPostById = async (req, res) => {
    const Id = req.params.id;

    try {
      const risk = await SosmedPostModel.findById({_id : Id}).populate("Author")
  
      res.status(200).json(risk);
    } catch (err) {
      console.log("Something is Wrong, " + err);
      res.status(444).send("No risk found with the given criteria!");
    }

  //   SosmedPostModel.findOne({_id : Id})
  //  .populate("Author")
  //  .exec(function (err, posts) {
  //     if (err) return handleError(err);
  //     console.log(posts);
  //     res.send(posts)
  //  })
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

const getPostComment = async (req, res) => {

  try {
  let comments = await SosmedPostModel.aggregate([
    {
      $lookup : {
        from: "comments",
        localField : "_id",
        foreignField : "PostID",
        as : "Test"
      }
    }
  ])
  res.send(comments);

 } catch (err) {
   console.log(err);
 }
}


router.post("/socialmedia/post", upload.single('Documents'), createPost);
router.get("/socialmedia/post/all", getAllPost);
router.get("/socialmedia/post/email", getPostByEmail);
router.get("/socialmedia/post/:id", getPostById);
router.get("/socialmedia/post/:id/comment", getPostComment);
router.delete("/socialmedia/post/delete/:id", deletePostById);

module.exports = router