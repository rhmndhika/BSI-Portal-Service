const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
   username : {
      type : String,
   },
   email : {
      type : String,
      require : true,
      unique : true
   },
   password : {
      type : String,
   },
   role : {
    type : String
   },
});

UserSchema.plugin(uniqueValidator)

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;