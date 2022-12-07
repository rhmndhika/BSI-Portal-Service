const express = require("express");
const router = express.Router();


const CommentModel = require("../models/Comment");


const createComment = async (req, res) => {

    // const Comments = new CommentModel({
    //     ContentMessage : req.body.Content,
    // })

    // await Comments.save();

    // res.send(Comments);

    const comment = new CommentModel(req.body) 

    comment.save((err, result) => {
        if (err) return res.json({success : false, err})

        CommentModel.find({ _id : comment._id })
        .populate('PostedBy')
        .exec((err, result) => {
            if (err) return res.json({success : false, err})
            return res.send(result);
        })
    })
}

const getComment = async (req, res) => {

    try {
        const COMMENT = await CommentModel.find({}).populate("RefPost");

        res.send(COMMENT);
    } catch (err) {
        res.send(err);
    }

   
}



router.post("/socialmedia/comment", createComment);
router.get("/socialmedia/comment/all", getComment);


module.exports = router