const mongoose = require("mongoose")

const UserProfileSchema = new mongoose.Schema({
    Email : {
        type : String,
        require : true
    },
    FullName : {
        type : String,
        require : true
    },
    Entity : {
        type : String,
        require : true
    },
    SupplierName : {
        type : String
    } 
})

const UserProfileModel = mongoose.model("userprofiles", UserProfileSchema)
module.exports = UserProfileModel