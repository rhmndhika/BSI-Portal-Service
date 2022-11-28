const mongoose = require("mongoose");


const SosmedPostSchema = new mongoose.Schema({
   Username : {
        type : String
   },
   FullName : {
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

}, {timestamps : true});


const SosmedPost = mongoose.model("sosmedposts", SosmedPostSchema);
module.exports = SosmedPost;