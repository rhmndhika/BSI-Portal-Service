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

  try {
    const Post = new SosmedPostModel({
      Username : req.body.Username,
      Title : req.body.Title,
      Content : req.body.Content,
      Documents : req.file ? `https://bsi-portal-service-production.up.railway.app/images/${req.file.filename}` : "No Documents",
      Author : req.body.Author
    })
    await Post.save().then(result => {
      SosmedPostModel.populate(Post, { path : "Author" })
      .then((post => {
        res.send(post)
      }))
    })
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

const getPostById = (req, res) => {
    const Id = req.params.id;

    SosmedPostModel.findById({_id : Id})
    .populate("Comments")
    .exec(function (err, posts) {
       if (err) return handleError(err);
       console.log(posts);
       res.send(posts)
    })
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

const likePost = (req, res) => {
  const Id = req.params.id;
  
  SosmedPostModel.findByIdAndUpdate({ _id : Id}, {
    $push : {Likes : req.body.Likes}
  }, {
    new : true
  }).populate("Likes").exec((err, result) => {
    if (err) {
      return res.status(422).send(err)
    } else {
      res.json(result)
    }
  })
}

const unlikePost = (req, res) => {
  const Id = req.params.id;
  
  SosmedPostModel.findByIdAndUpdate({ _id : Id}, {
    $pull : {Likes : req.body.Likes}
  }, {
    new : true
  }).exec((err, result) => {
    if (err) {
      return res.status(422).send(err)
    } else {
      res.json(result)
    }
  })
}

const createComment = (req, res) => {
  const Id = req.params.id;

  const comment = {
    Text : req.body.Text,
    PostedBy : req.body.PostedBy
  }

  SosmedPostModel.findByIdAndUpdate({_id : Id}, {
    $push : {Comments : comment}
  }, {
    new : true
  }).populate("Comments.PostedBy")
  .exec((err, result) => {
    if (err) {
      return res.status(422).json({error : err})
    } else {
      res.json(result)
    }
  })
}


router.post("/socialmedia/post", upload.single('Documents'), createPost);
router.get("/socialmedia/post/all", getAllPost);
router.get("/socialmedia/post/email", getPostByEmail);
router.get("/socialmedia/post/:id", getPostById);
router.delete("/socialmedia/post/delete/:id", deletePostById);
router.put("/socialmedia/:id/like", likePost);
router.put("/socialmedia/:id/unlike", unlikePost);
router.put("/socialmedia/post/:id/comment", createComment);

module.exports = router