const mongoose = require("mongoose");

const VendorRegistrationSchema = new mongoose.Schema({
    email : {
        type : String,
        require : true
    },
    CompanyName : {
        type : String,
        require : true
    },
    Address : {
        type : String,
        require : true
    },
    PhoneNumber : {
        type : String,
        require : true
    },
    PresidentName : {
        type : String,
        require : true
    },
    ManagerEmail : {
        type : String,
        require : true
    },
    ManagerPhone : {
        type : String,
        require : true
    },
    PICEmail : {
        type : String,
        require : true
    },
    PICPhone : {
        type : String,
        require : true
    },
    EstablishedDate : {
        type : Date,
        require : true
    },
    ChoiceBusiness : {
        type : [[String]],
        require : true
    },
    EmployeeNumber : {
        type : String,
        require : true
    },
    NumberOfCustomer : {
        type : Number,
        require : true
    },
    Attachments : {
        type : [[String]],
        require : true
    },
    Status : {
        type : String,
        require : true
    },
    Submitted : {
        type : String,
        require : true
    },
    SKAny : {
        type : String,
        require : true
    },
    SKValid : {
        type : String,
        require : true
    },
    NPWPAny : {
        type : String,
        require : true
    },
    NPWPValid : {
        type : String,
        require : true
    },
    SIUPAny : {
        type : String,
        require : true
    },
    SIUPValid : {
        type : String,
        require : true
    },
    TDPAny : {
        type : String,
        require : true
    },
    TDPValid : {
        type : String,
        require : true
    },
    DomisiliAny : {
        type : String,
        require : true
    },
    DomisiliValid : {
        type : String,
        require : true
    },
    SPKPAny : {
        type : String,
        require : true
    },
    SPKPValid : {
        type : String,
        require : true
    },
    AuditAny : {
        type : String,
        require : true
    },
    AuditValid : {
        type : String,
        require : true
    },
    TaxAny : {
        type : String,
        require : true
    },
    TaxValid : {
        type : String,
        require : true
    },
    BankAny : {
        type : String,
        require : true
    },
    BankValid : {
        type : String,
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
}, {timestamps : true});

const VendorRegistrationModel = mongoose.model("vendorregistration" , VendorRegistrationSchema)
module.exports = VendorRegistrationModel;