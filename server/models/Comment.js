const mongoose = require("mongoose");

const SosmedPostModel = require("../models/SosmedPost"); 

const CommentSchema = new mongoose.Schema({
   ContentMessage : {
        type : String
   },
   RefPost : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : SosmedPostModel
   }]
}, {timestamps : true});



const CommentModel = mongoose.model("comments", CommentSchema);
module.exports = CommentModel;