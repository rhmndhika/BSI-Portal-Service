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

const getAllVendorRegistration = (req, res) => {

    VendorRegistrationModel.find({} , (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
}


const getVendorRegistrationByEmail = (req, res) => {

    VendorRegistrationModel.find({email : req.session.email} , (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
}

const getVendorRegistrationById = (req, res) => {
    const Id = req.params.id;

    VendorRegistrationModel.findById({_id : Id}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
}

const deleteVendorRegistrationById = (req, res) => {
    const Id = req.params.id;
  
    VendorRegistrationModel.findByIdAndDelete({_id : Id}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
  });
}

const updateVendorRegistrationById = (req, res) => {
  const Id = req.body.id;

  VendorRegistrationModel.findByIdAndUpdate({_id : Id}, {
    CompanyName : req.body.cName,
    Address : req.body.Address,
    PhoneNumber : req.body.phoneNumber,
    PresidentName : req.body.presidentName,
    ManagerEmail : req.body.managerEmail,
    ManagerPhone : req.body.managerPhone,
    PICEmail : req.body.picEmail,
    PICPhone : req.body.picPhone,
    EstablishedDate : req.body.date,  
    EmployeeNumber : req.body.employeeNumber,
    NumberCustomer : req.body.numberOfCustomer,
    SKAny : req.body.skAny,
    SKValid : req.body.skValid,
    NPWPAny : req.body.npwpAny,
    NPWPValid : req.body.npwpValid,
    SIUPAny : req.body.siupAny,
    SIUPValid : req.body.siupValid,
    TDPAny : req.body.tdpAny,
    TDPValid : req.body.tdpValid,
    DomisiliAny : req.body.domisiliAny,
    DomisiliValid : req.body.domisiliValid,
    SPKPAny : req.body.spkpAny,
    SPKPValid : req.body.spkpValid,
    AuditAny : req.body.auditAny,
    AuditValid : req.body.auditValid,
    TaxAny : req.body.taxAny,
    TaxValid : req.body.taxValid,
    BankAny : req.body.bankAny,
    BankValid : req.body.bankValid
}, 
(err, result) => {
    if (err) {
        console.log(err);
    } else {
        res.send(result);
    }
})
}

const updateStatusVendorById = (req, res) => {
  const Id = req.body.id;
  const status = req.body.status;

   VendorRegistrationModel.findByIdAndUpdate({_id : Id}, { $set : {"status" : status}},  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  })
}

const updateSubmittedById = (req, res) => {
  const Id = req.body.id;
    const submitted = req.body.submitted;

    VendorRegistrationModel.findByIdAndUpdate({_id : Id}, { $set : {"submitted" : submitted}},  (err, result) => {
        if (err) {
            req.send(err);
        } else {
            res.send(result);
        }
    }).catch((error) => {
        console.log(error);
    })
}

router.post("/vendor/registration", upload.array('fileVendorRegistration', 20), createVendorRegistration);
router.get("/vendor/registration", getVendorRegistrationByEmail);
router.get("/vendor/registration/all", getAllVendorRegistration);
router.get("/vendor/registration/:id", getVendorRegistrationById);
router.put("/vendor/update", updateVendorRegistrationById);
router.put("/vendor/update/status", updateStatusVendorById);
router.put("/vendor/update/submitted", updateSubmittedById);
router.delete("/vendor/delete/:id", deleteVendorRegistrationById);


module.exports = router