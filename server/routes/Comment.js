const express = require("express");
const router = express.Router();


const CommentModel = require("../models/Comment");

const createComment = async (req, res) => {

    const Comments = new CommentModel({
        Content : req.body.Content
    })

    await Comments.save();

    res.send(Comments);
}

const getComment = (req, res) => {

    CommentModel.find({}).populate("RefPost").then((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
}



router.post("/socialmedia/comment", createComment);
router.get("/socialmedia/comment/all", getComment);


module.exports = router