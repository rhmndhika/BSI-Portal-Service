const mongoose = require("mongoose");

const UserModel = require("../models/Users");

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
   PostedBy : {
     type : mongoose.Schema.Types.ObjectId,
     ref : "UserModel"
   }
}, {timestamps : true});


const SosmedProfileModel = require("../models/SosmedProfile");

const SosmedPostModel = mongoose.model("sosmedposts", SosmedPostSchema);
module.exports = SosmedPostModel;