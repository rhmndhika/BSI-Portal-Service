const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const PaygDataSchema = new mongoose.Schema({
    ID : {
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
}, {timestamps : true})

PaygDataModel.plugin(AutoIncrement, {inc_field : 'ID'})

const PaygDataModel = mongoose.model("paygdatas", PaygDataSchema)
module.exports = PaygDataModel