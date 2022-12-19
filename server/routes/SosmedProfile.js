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

const getProfileById = async (req, res) => {
  const Id = req.params.id;

  // SosmedProfileModel.findById({_id : Id}, (err, result) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.send(result);
  //   }
  // })

  try {
    const getProfile = await SosmedProfileModel.findOne({_id : Id})
    .populate("Post")
    .exec()

    res.send(getProfile)
  } catch (err) {
    console.log(err);
  }
}

const deleteProfileById = (req, res) => {
  const Id = req.params.id;

    SosmedProfileModel.findByIdAndDelete({_id : Id}, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result)
      }
    })
}

const updateProfileById = (req, res) => {

   SosmedProfileModel.findByIdAndUpdate({_id : req.body.id}, {
      FullName : req.body.FullName,
      Username : req.body.Username,
      ProfilePicture : `https://bsi-portal-service-production.up.railway.app/images/${req.file.filename}`,
      Bio : req.body.Bio
    }, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result); 
      }
    })

}

router.post("/socialmedia/profile/create", upload.single('ProfilePicture'), createProfile);
router.get("/socialmedia/profile/all", getAllProfiles);
router.get("/socialmedia/profile/email", getProfileByEmail);
router.get("/socialmedia/profile/:id", getProfileById);
router.delete("/socialmedia/profile/:id/delete", deleteProfileById);
router.put("/socialmedia/profile/:id/update", updateProfileById);

module.exports = router