const mongoose = require("mongoose");


const MessageSchema = new mongoose.Schema({
    User : {
        type : String
    },
    Message : {
        type : String
    },
    Room : {
        type : Number
    }
}, {timestamps : true})

const MessageModel = mongoose.model("messages", MessageSchema);
module.exports = MessageModel


