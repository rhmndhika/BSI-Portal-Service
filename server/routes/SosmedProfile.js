const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');

const SosmedProfileModel = require("../models/SosmedProfile.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() +  path.extname(file.originalname))
  }
});

const upload = multer({storage: storage});

const createProfile = async (req, res) => {
  
  const Profile = new SosmedProfileModel({
    FullName : req.body.FullName,
    Username : req.body.Username,
    ProfilePicture : `https://bsi-portal-service-production.up.railway.app/images/${req.file.filename}`,
    Bio : req.body.Bio
  })

  await Profile.save();
  res.send(Profile);
}

const getAllProfiles = (req, res) => {
    
    SosmedProfileModel.find({}, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
    })
}


const getProfileByEmail = (req, res) => {
    
    SosmedProfileModel.findOne({Username : req.session.email}, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
    })
}


  
router.post("/socialmedia/create", upload.single('ProfilePicture'), createProfile);
router.get("/socialmedia/all", getAllProfiles);
router.get("/socialmedia", getProfileByEmail);

module.exports = router