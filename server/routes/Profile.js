const express = require("express");
const router = express.Router();

const UserProfileModel = require("../models/UserProfiles.js");

const createProfile = async (req, res) => {
  const Profile = new UserProfileModel({
    Email : req.body.Email,
    FullName : req.body.FullName,
    Entity : req.body.Entity,
    SupplierName : req.body.SupplierName
  })

  await Profile.save();
  res.send(Profile);
}

const getUserProfileByEmail = (req, res) => {
  UserProfileModel.findOne({Email : req.session.email}, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
}

const getUserProfileByEntity = (req, res) => {
  UserProfileModel.find({Entity : "BSI"}, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
}
  
router.post("/profile", createProfile);
router.get("/profile", getUserProfileByEmail);
router.get("/profileentity", getUserProfileByEntity);

module.exports = router