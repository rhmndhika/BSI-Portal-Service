const mongoose = require("mongoose")


const PaygDataSchema = new mongoose.Schema({
    Email : {
        type : String
    },
    InvoiceNumber : {
        type : String
    },
    InvoiceDate : {
        type : Date
    },
    BuyerName : {
        type : String
    },
    Amount : {
        type : Number
    },
    Subject : {
        type : String
    },
    PaygAttachments : {
        type : [[String]]
    }
}, {timestamps : true})

const PaygDataModel = mongoose.model("paygdatas", PaygDataSchema)
module.exports = PaygDataModel