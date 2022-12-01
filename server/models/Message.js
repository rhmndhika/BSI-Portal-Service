const mongoose = require("mongoose");


const MessageSchema = new mongoose.Schema({
    User : {
        type : String
    },
    Message : {
        type : String
    }
})

const MessageModel = mongoose.model("messages", MessageSchema);
module.exports = MessageModel


