const mongoose = require("mongoose");

const SosmedPostSchema = new mongoose.Schema({
   Username : {
        type : String
   }, 
   Content : {
        type : String
   },
   Documents : {
        type : String
   },
   user : {
     type : mongoose.Schema.Types.ObjectId,
     ref : "sosmedprofiles"
   },
   comments : [{
     type: mongoose.Schema.Types.ObjectId,
     ref: "comments"
   }]
}, {timestamps : true});



const SosmedPostModel = mongoose.model("sosmedposts", SosmedPostSchema);
module.exports = SosmedPostModel;