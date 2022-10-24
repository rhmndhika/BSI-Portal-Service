const mongoose = require("mongoose")


const UserProfileSchema = new mongoose.Schema({
    CurrentUser : {
        type : String
    },
    FullName : {
        type : String
    },
    Entity : {
        type : String
    },
    ProfileEmail : {
        type : String
    },
    SupplierName : {
        type : String
    } 
})

const UserProfileModel = mongoose.model("userprofiles", UserProfileSchema)
module.exports = UserProfileModel