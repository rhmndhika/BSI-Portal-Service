const express = require("express");
const router = express.Router();


const CommentModel = require("../models/Comment");


const createComment = async (req, res) => {

    const Comments = new CommentModel({
        ContentMessage : req.body.Content,
        WriterID : req.body.WriterID,
        PostID : req.body.PostID
    })

    await Comments.save();

    res.send(Comments);
}

const getComment = async (req, res) => {

   CommentModel.find({_id : CommentModel._id}).populate("PostedBy").exec((err, result) => {
    if (err) return res.send(err);
    console.log("Populated User" + result);
    res.send(result);
   })

   
}



router.post("/socialmedia/comment", createComment);
router.get("/socialmedia/comment/all", getComment);


module.exports = router