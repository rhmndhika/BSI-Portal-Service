const mongoose = require("mongoose");

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
   PostedBy : {type : mongoose.Schema.Types.ObjectId, ref : "sosmedprofiles"}
}, {timestamps : true});



const SosmedPostModel = mongoose.model("sosmedposts", SosmedPostSchema);
module.exports = SosmedPostModel;