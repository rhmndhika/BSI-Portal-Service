const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
   ContentMessage : {
          type : String
   },
   PostID : {
          type : String
   },
   WriterID : {
          type : String
   },
   user : {
       type : mongoose.Schema.Types.ObjectId,
       ref : "sosmedprofiles"
   },
   post : {
         type : mongoose.Schema.Types.ObjectId,
          ref : "sosmedposts"
   }
}, {timestamps : true});



const CommentModel = mongoose.model("comments", CommentSchema);
module.exports = CommentModel;