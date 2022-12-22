const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    Email : {
        type : String
    },
    Username : {
        type : String
    },
    Title : {
        type : String
    },
    Tags : [String],
    Content : {
        type : String
    }
}, {timestamps : true});

const NewsModel = mongoose.model("news", NewsSchema);
module.exports = NewsModel;
