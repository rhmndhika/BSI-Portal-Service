const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {

    const Profile = new UserProfileModel({
      Email : req.body.Email,
      FullName : req.body.FullName,
      Entity : req.body.Entity,
      SupplierName : req.body.SupplierName
    })
  
    await Profile.save();
    res.send(Profile);
  })
  
  router.get("/", async (req, res) => {
    UserProfileModel.findOne({Email : req.session.email}, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    })
  })

module.exports = router