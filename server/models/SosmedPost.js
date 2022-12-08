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
   Author : {
     type : mongoose.Schema.Types.ObjectId,
     ref : "sosmedprofiles",
     autopupulate : true
   },
//    comments : [{
//      type: mongoose.Schema.Types.ObjectId,
//      ref: "comments"
//    }]
}, {timestamps : true});


SosmedPostSchema.plugin(require('mongoose-autopopulate'));
const SosmedPostModel = mongoose.model("sosmedposts", SosmedPostSchema);
module.exports = SosmedPostModel;