const mongoose = require("mongoose");

const UserModel = require("../models/Users");
const CommentModel = require("../models/Comment")

const SosmedPostSchema = new mongoose.Schema({
   Username : {
        type : String
   }, 
   Title : {
        type : String
   },
   Content : {
        type : String
   },
   Documents : {
        type : String
   },
   PostedBy : [{
     type : mongoose.Schema.Types.ObjectId,
     ref : UserModel
   }],
   Comment : [{ 
     type : mongoose.Schema.Types.ObjectId, 
     ref : CommentModel
   }]
}, {timestamps : true});



const SosmedPostModel = mongoose.model("sosmedposts", SosmedPostSchema);
module.exports = SosmedPostModel;