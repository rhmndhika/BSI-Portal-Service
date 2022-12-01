const mongoose = require("mongoose");

const SosmedPostModel = require("../models/SosmedPost"); 
const UserModel = require("../models/Users");

const CommentSchema = new mongoose.Schema({
   ContentMessage : {
        type : String
   },
   RefPost : {
        type : mongoose.Schema.Types.ObjectId,
        ref : SosmedPostModel
   },
   user : {
     type : mongoose.Schema.Types.ObjectId,
        ref : UserModel
   }
}, {timestamps : true});



const CommentModel = mongoose.model("comments", CommentSchema);
module.exports = CommentModel;