const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   email : {
    type : String
   },
   password : {
    type : String
   },
   role : {
    type : String
   },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;