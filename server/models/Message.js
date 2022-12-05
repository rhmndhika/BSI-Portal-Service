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
    },
    SocketID : {
        type : String
    }
})

const MessageModel = mongoose.model("messages", MessageSchema);
module.exports = MessageModel


