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

  
  try {

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

  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

const getPaygByEmail = (req, res) => {
 PaygDataModel.find({Email : req.session.email}, (err, result) => {
    if (err) {
     res.send(err)
    } else {
     res.send(result)
    }
   })
}

const getPaygById = (req, res) => {
  const Id = req.params.id;

  PaygDataModel.findById({_id : Id}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
}

const deletePaygById = (req, res) => {
  const Id = req.params.id;

  PaygDataModel.findByIdAndDelete({_id : Id}, (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
}

const getAllPaygData = (req, res) => {

  PaygDataModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
   });
}

const updatePaygData = (req, res) => {
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

const updateSubmittedById = (req, res) => {
  const Id = req.body.id;
  const submitted = req.body.submitted;

  PaygDataModel.findByIdAndUpdate({_id : Id}, { $set : {"submitted" : submitted}},  (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
  })
}

const updateStatusById = (req, res) => {
  const Id = req.body.id;
  const status = req.body.status;

  PaygDataModel.findByIdAndUpdate({_id : Id}, { $set : {"status" : status}},  (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
  })
}

const getPaygAdminByBuyerName = (req, res) => {

  PaygDataModel.find({BuyerName : req.session.username}, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
   })
}

const getPaygAdminById = (req, res) => {
  const Id = req.params.id;
  
  PaygDataModel.findById({_id : Id}, (err, result) => {
      if (err) {
          res.send(err)
      }else {
          res.send(result)
      }
  })
}

router.post("/paygdata", upload.array('file', 20), createPayg);
router.get("/getallpaygdata", getAllPaygData)
router.get("/paygdata", getPaygByEmail);
router.get("/paygdata/:id", getPaygById);
router.get("/admin/paygdata", getPaygAdminByBuyerName);
router.get("/admin/paygdata/:id", getPaygAdminById);
router.get("/paygdata/:id", getPaygById);
router.put("/updatepaygdata", upload.array('file', 20), updatePaygData);
router.put("/updateSubmitted", updateSubmittedById);
router.put("/updateStatus", updateStatusById);
router.delete("/deletepaygdata/:id", deletePaygById);

module.exports = router