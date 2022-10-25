const mongoose = require("mongoose")


const PaygDataSchema = new mongoose.Schema({
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
        type : String,
        require : true
    },
    submitted : {
        type : String,
        require : true
    }
}, {timestamps : true})

const PaygDataModel = mongoose.model("paygdatas", PaygDataSchema)
module.exports = PaygDataModel