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
   PostedBy : {
        type : String,
        default : ""
   },
   Comments : [
     {
          text:{
               type: String
          },
          created:{
               type: Date,
               default : Date.now
          },
          postedBy:{
               type: String
          }
     }
     ]
}, {timestamps : true});



const SosmedPostModel = mongoose.model("sosmedposts", SosmedPostSchema);
module.exports = SosmedPostModel;