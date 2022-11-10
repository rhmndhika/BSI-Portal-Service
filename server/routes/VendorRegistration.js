const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');

const VendorRegistrationModel = require("../models/VendorRegistration");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() +  path.extname(file.originalname))
  }
});

const upload = multer({storage: storage});

const createVendorRegistration = async (req, res) => {

    const reqBusiness = [];
    reqBusiness.push(req.body.ChoiceBusiness);       

    const reqFiles = [];
    const url = "https://empty-test-project.herokuapp.com/images/";
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + req.files[i].filename);       
    };

    const dataVendor = new VendorRegistrationModel({
         email : req.body.email,
         CompanyName : req.body.CompanyName,
         Address : req.body.Address,
         PhoneNumber : req.body.Phone,
         PresidentName : req.body.PresidentName,
         ManagerEmail : req.body.ManagerEmail,
         ManagerPhone : req.body.ManagerPhone,
         PICEmail : req.body.PICEmail,
         PICPhone : req.body.PICPhone,
         EstablishedDate : req.body.EstablishedDate,
         ChoiceBusiness :  reqBusiness,
         EmployeeNumber : req.body.EmployeeNumber,
         NumberOfCustomer : req.body.NumberOfCustomer,
         SKAny : req.body.SKAny,
         SKValid : req.body.SKValid,
         NPWPAny : req.body.NPWPAny,
         NPWPValid : req.body.NPWPValid,
         SIUPAny : req.body.SIUPAny,
         SIUPValid : req.body.SIUPValid,
         TDPAny : req.body.TDPAny,
         TDPValid : req.body.TDPValid,
         DomisiliAny : req.body.DomisiliAny,
         DomisiliValid : req.body.DomisiliValid,
         SPKPAny : req.body.SPKPAny,
         SPKPValid : req.body.SPKPValid,
         AuditAny : req.body.AuditAny,
         AuditValid : req.body.AuditValid,
         TaxAny : req.body.TaxAny,
         TaxValid : req.body.TaxValid,
         BankAny : req.body.BankAny,
         BankValid : req.body.BankValid,
         Attachments : reqFiles
        })

    await dataVendor.save();
    res.json(dataVendor);
}

const getVendorRegistrationByEmail = () => {

    VendorRegistrationModel.find({email : req.session.email.email} , (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
}

const getVendorRegistrationByID = () => {
    const Id = req.params.id;

    VendorRegistrationModel.findById({_id : Id}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
}

router.post("/vendorregistration", upload.array('fileVendorRegistration', 20), createVendorRegistration);
router.get("/vendorregistration", getVendorRegistrationByEmail);
router.get("/vendorregistration/:id", getVendorRegistrationByID);

module.exports = router