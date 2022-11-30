const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
   ContentMessage : {
        type : String
   },
   RefPost : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "sosmedposts"
   }
}, {timestamps : true});



const CommentModel = mongoose.model("comments", CommentSchema);
module.exports = CommentModel;