const express = require("express");
const router = express.Router();


const CommentModel = require("../models/Comment");

const createComment = async (req, res) => {

    try {
        const Comments = new CommentModel({
            Text : req.body.Text,
            Writer : req.body.Writer,
            PostID : req.body.PostID
        })
        await Comments.save().then(result => {
            CommentModel.populate(Comments, { path : "Writer" })
            .then((comment => {
              res.send(comment)
            }))
          })
    } catch (err) {
        console.log(err)
    }
}

const getComment = async (req, res) => {
    
   CommentModel.find({ PostID : req.body.PostID })
   .populate("Writer")
   .exec((err, comments) => {
    if (err) return res.status(400).send(err)
    res.status(200).send(comments);
   })
   
}



router.post("/socialmedia/comment", createComment);
router.get("/socialmedia/comment/all", getComment);


module.exports = router