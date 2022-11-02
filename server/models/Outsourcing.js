const mongoose = require("mongoose");


const OutsourcingSchema = new mongoose.Schema({
   Email : {
     type : String,
     require : true
   },
   Name : {
     type : String,
     require : true
   },
   IDLink : {
     type : String,
     require : true
   },
   Supplier : {
     type : String,
     require : true
   },
   User1 : {
     type : String,
     require : true
   },
   User2 : {
     type : String,
     require : true
   },
   RoleQuotation : {
     type : Number,
     require : true
   },
   OutsourcingAttachments : {
     type : [[String]],
     require : true
   },
}, {timestamps : true}, {_id : false});


const OutsourcingModel = mongoose.model("outsourcings", OutsourcingSchema);
module.exports = OutsourcingModel;