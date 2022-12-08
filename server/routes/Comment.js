const express = require("express");
const router = express.Router();


const CommentModel = require("../models/Comment");
const SosmedPostModel = require("../models/SosmedPost");


const createComment = async (req, res) => {

    const Comments = new CommentModel({
        ContentMessage : req.body.Content,
        WriterID : req.body.WriterID,
        PostID : req.body.PostID
    })
    
    Comments.save().then(result => {
        CommentModel.populate(Comments, { path : "WriterID" })
        .then(comment => {
            res.json({
                message : "Comment Added",
                comment
            })
        })
    })
}

const getComment = async (req, res) => {
     
}



router.post("/socialmedia/comment", createComment);
router.get("/socialmedia/comment/all", getComment);


module.exports = router