const express = require("express");
const router = express.Router();


const CommentModel = require("../models/Comment");

const createComment = async (req, res) => {
    
    try {
        const Comments = new CommentModel({
            Text : req.body.Content,
            PostedBy : req.body.WriterID
        })
        await CommentModel.save().then(result => {
            CommentModel.populate(Comments, { path : "PostedBy" })
            .then((comment => {
              res.send(comment)
            }))
          })
    } catch (err) {
        console.log(err)
    }
}

const getComment = async (req, res) => {
    
   CommentModel.find({}, (err, result) => {
       if (err) return res.send(err);
       res.send(result);
    }) 
   
}



router.post("/socialmedia/comment", createComment);
router.get("/socialmedia/comment/all", getComment);


module.exports = router