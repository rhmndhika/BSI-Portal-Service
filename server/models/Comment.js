const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
   Text : {
          type : String
   },
   PostedBy : {
          type : mongoose.Schema.Types.ObjectId, ref : "sosmedprofiles"
   },
   Posts : {
       type : mongoose.Schema.Types.ObjectId, ref : "sosmedposts"
   }
}, {timestamps : true});



const CommentModel = mongoose.model("comments", CommentSchema);
module.exports = CommentModel;