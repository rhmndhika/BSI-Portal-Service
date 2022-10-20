const mongoose = require("mongoose")


const UserProfileSchema = new mongoose.Schema({
    Email : {
        type : String
    },
    CompanyName : {
        type : String
    },
    PIC : {
        type : String
    },
    PICEmail : {
        type : String
    }, 
    Occupation : {
        type : String
    }
})

const UserProfileModel = mongoose.model("userprofiles", UserProfileSchema)
module.exports = UserProfileModel