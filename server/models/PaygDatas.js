const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const PaygDataSchema = new mongoose.Schema({
    _id : {
        type : Number
    },
    Email : {
        type : String,
        require : true
    },
    InvoiceNumber : {
        type : String,
        require : true
    },
    InvoiceDate : {
        type : Date,
        require : true
    },
    BuyerName : {
        type : String,
        require : true
    },
    Amount : {
        type : Number,
        require : true
    },
    Subject : {
        type : String,
        require : true
    },
    PaygAttachments : {
        type : [[String]],
        require : true
    },
    status : {
        type : String
    },
    submitted : {
        type : String
    }
}, {timestamps : true}, {_id : false})

PaygDataSchema.plugin(AutoIncrement);

const PaygDataModel = mongoose.model("paygdatas", PaygDataSchema)
module.exports = PaygDataModel