const mongoose = require("mongoose");


const SosmedProfileSchema = new mongoose.Schema({
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
   }
}, {timestamps : true});


const SosmedProfileModel = mongoose.model("sosmedprofiles", SosmedProfileSchema);
module.exports = SosmedProfileModel