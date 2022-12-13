const mongoose = require("mongoose");


const SosmedProfileSchema = new mongoose.Schema({
   _id : {
     type : mongoose.Schema.Types.ObjectId
   },
   Username : {
        type : String
   },
   FullName : {
        type : String
   },
   ProfilePicture : {
        type : String
   },
   Bio : {
        type : String
   },
   Post : { type : mongoose.Schema.Types.ObjectId, ref : 'sosmedposts'}
}, {timestamps : true});


const SosmedProfileModel = mongoose.model('sosmedprofiles', SosmedProfileSchema);
module.exports = SosmedProfileModel