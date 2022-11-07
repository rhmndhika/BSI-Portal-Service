const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');

const OutsourcingModel = require("../models/Outsourcing.js");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() +  path.extname(file.originalname))
    }
  });
  
const upload = multer({storage: storage});

const createOutsourcingData = async (req, res) => {
    const reqFilesOutsourcing = [];
    const url = "https://empty-test-project.herokuapp.com/images/";
    for (var i = 0; i < req.files.length; i++) {
      reqFilesOutsourcing.push(url + req.files[i].filename);       
    };
  
     const dataOutsourcing = new OutsourcingModel({
      Email : req.body.Email,
      Name : req.body.Name,
      IDLink : req.body.IDLink,
      Supplier : req.body.Supplier,
      User1 : req.body.User1,
      User2 : req.body.User2,
      RoleQuotation : req.body.RoleQuotation,
      OutsourcingAttachments : reqFilesOutsourcing
    })
  
    await dataOutsourcing.save();
    res.json(dataOutsourcing);
}

const getOutsourcingDataByEmail = (req, res) => {

    OutsourcingModel.find({Email : req.session.email}, (err, result) => {
        if (err) {
           res.send(err)
        } else {
            res.send(result)
        }
    })    
}

const getOutsourcingDataById = () => {
  const Id = req.params.id;
  
  OutsourcingModel.findById({_id : Id}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
}

const deleteOutsourcingById = (req, res) => {
  const Id = req.params.id;

  OutsourcingModel.findByIdAndDelete({_id : Id}, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        res.send(result);
    }
});
}

router.post("/outsourcing", upload.array('fileOutsourcing', 20), createOutsourcingData);
router.get("/outsourcing", getOutsourcingDataByEmail);
router.get("/outsourcing/:id", getOutsourcingDataById);
router.get("/deleteoutsourcing/:id", deleteOutsourcingById);

module.exports = router