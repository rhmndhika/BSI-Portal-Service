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
       Text : {
              type : String
       },
       PostedBy : { 
              type : mongoose.Schema.Types.ObjectId, 
              ref : "sosmedprofiles"
       }
   }],
   Likes : [{
          type : mongoose.Schema.Types.ObjectId,
          ref : "sosmedprofiles"
   }],
   PostedBy : {
          type : mongoose.Schema.Types.ObjectId,
          ref : "sosmedprofiles"
   }
}, {timestamps : true});


const SosmedPostModel = mongoose.model('sosmedposts', SosmedPostSchema);
module.exports = SosmedPostModel;