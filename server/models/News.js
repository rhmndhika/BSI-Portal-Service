const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    Email : {
        type : String,
        require : true
    },
    Username : {
        type : String,
        require : true
    },
    Title : {
        type : String,
        maxLength : 24,
        require : true
    },
    Tags : [String],
    Content : {
        type : String,
        require : true
    }
}, {timestamps : true});

const NewsModel = mongoose.model("news", NewsSchema);
module.exports = NewsModel;
