const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
   email : {
    type : String,
    require : true
   },
   password : {
    type : String,
    require : true
   },
   role : {
    type : String
   },
});

// UserSchema.plugin(uniqueValidator)

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;