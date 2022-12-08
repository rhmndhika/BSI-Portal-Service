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
    
    await Comments.save();

    res.send(Comments);
}

const getComment = async (req, res) => {
       
   CommentModel.aggregate([
    {
        $lookup : {
            from : "sosmedpost",
            localField : "WritedID",
            foreignField : "_id",
            as : "PostedBy"
        }
    }
   ])


   
}



router.post("/socialmedia/comment", createComment);
router.get("/socialmedia/comment/all", getComment);


module.exports = router