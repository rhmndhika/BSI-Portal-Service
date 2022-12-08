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
   }
}, {timestamps : true});



const CommentModel = mongoose.model("comments", CommentSchema);
module.exports = CommentModel;