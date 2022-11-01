const express = require("express")
const router = express.Router()


router.post("/", upload.array('file', 20), async (req, res) => {
   
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
  });
  
  router.get("/", (req, res) => {
    PaygDataModel.find({Email : req.session.email}, (err, result) => {
  
     if (err) {
        res.send(err)
     } else {
        res.send(result)
     }
    })
  });


  module.exports = router