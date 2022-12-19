const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
   Text : {
          type : String
   },
   Writer : {
          type : mongoose.Schema.Types.ObjectId, ref : "sosmedprofiles"
   },
   PostID : {
       type : mongoose.Schema.Types.ObjectId, ref : "sosmedposts"
   }
}, {timestamps : true});



const CommentModel = mongoose.model("comments", CommentSchema);
module.exports = CommentModel;