const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');

const PaygDataModel = require("../models/PaygDatas");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() +  path.extname(file.originalname))
  }
});

const upload = multer({storage: storage});

const createPayg = async (req, res) => {

  const reqFiles = [];
  const url = "https://empty-test-project.herokuapp.com/images/";
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + req.files[i].filename);       
  };

   const data = new PaygDataModel({
    Email : req.body.email,
    InvoiceNumber : req.body.InvoiceNumber,
    InvoiceDate : req.body.InvoiceDate,
    BuyerName : req.body.BuyerName ,
    Amount : req.body.Amount,
    Subject : req.body.Subject,
    PaygAttachments : reqFiles
  })

  await data.save();
  res.json(data);

}

const getPaygByEmail = async (req, res) => {
  PaygDataModel.find({Email : req.session.email}, (err, result) => {
    if (err) {
     res.send(err)
    } else {
     res.send(result)
    }
   })
}

const getPaygById = async (req, res) => {
  const Id = req.params.id;

  PaygDataModel.findById({_id : Id}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
}

const deletePaygById = async (req, res) => {
  const Id = req.params.id;

  PaygDataModel.findByIdAndDelete({_id : Id}, (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
}

const getAllPaygData = async (req, res) => {
  PaygDataModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
   });
}

const updatePaygData = async (req, res) => {
  const reqFiles = [];
  const url = "https://empty-test-project.herokuapp.com/images/";
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + req.files[i].filename);       
  };

  PaygDataModel.findByIdAndUpdate({_id : req.body.id}, {
    InvoiceNumber : req.body.InvoiceNumber,
    InvoiceDate : req.body.InvoiceDate,
    BuyerName : req.body.BuyerName ,
    Amount : req.body.Amount,
    Subject : req.body.Subject,
    Attachments : reqFiles
  }, (err, result) => {
      if(err) {
        res.send(err)
      } else {
        res.send(result)
      }
  })
}

router.post("/paygdata", upload.array('file', 20), createPayg);
router.get("/getallpaygdata", getAllPaygData)
router.get("/paygdata", getPaygByEmail);
router.get("/paygdata/:id", getPaygById);
router.put("/updatepaygdata", upload.array('file', 20), updatePaygData);
router.delete("/deletepaygdata/:id", deletePaygById);

module.exports = router