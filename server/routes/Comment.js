const express = require("express");
const router = express.Router();


const CommentModel = require("../models/Comment");


const createComment = async (req, res) => {

    const Comments = new CommentModel({
        ContentMessage : req.body.Content,
        RefPost : ""
    })

    // await Comments.save();

    // res.send(Comments);

    Comments.save().then(result => {
        CommentModel.populate(Comments, { path : "RefPost" })
        .then(comments => {
            res.send(comments)
        })
    })
}

const getComment = (req, res) => {

    CommentModel.find({}).populate("RefPost").then(comment => {
        res.send(comment);
    })
}



router.post("/socialmedia/comment", createComment);
router.get("/socialmedia/comment/all", getComment);


module.exports = router