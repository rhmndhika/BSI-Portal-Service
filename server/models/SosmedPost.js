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
       ref : 'sosmedprofiles'
   },
   Comments : [{
       PostedBy : { 
              type : mongoose.Schema.Types.ObjectId, 
              ref : "sosmedprofiles"
       },
       Text : {
              type : String
       }
   }],
   Likes : [{
          type : mongoose.Schema.Types.ObjectId,
          ref : "sosmedprofiles"
   }],
   Liked : {
       type : String
   }
}, {timestamps : true});


const SosmedPostModel = mongoose.model('sosmedposts', SosmedPostSchema);
module.exports = SosmedPostModel;