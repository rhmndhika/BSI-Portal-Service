const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const UserModel = require("../models/Users.js");

const createUser = (req, res) => {
 UserModel.findOne({ email: req.body.email }).then((user) => {
    bcrypt.compare(req.body.password, user.password).then((passwordCheck) => {

        if(!passwordCheck) {
          return res.status(400).send({
            message: "Passwords does not match",
            error,
            result,
          });
        }
        const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

        const result = user.email
          req.session.email = result
        const role = user.role
          req.session.role = role
        const username = user.username
          req.session.username = username
        res.status(200).send({
            message: "Login Successful",
            username,
            email: user.email,
            result,
            role,
            token
        });
        }).catch((error) => {
            res.status(400).send({
            message: "Passwords does not match",
            error
        });
        }).catch((e) => {
            res.status(404).send({
            message: "Email not found",
            e,
        });
        }).catch((e) => {
            res.status(406).send({
            message: "Username not found",
            e,
        });
});   
});
}

const getUserByEmail = (req, res) => {
  if(req.session.email) {
    res.send({loggedIn: true, email: req.session.email, role : req.session.role, username : req.session.username })     
  } else {
    res.send({loggedIn: false})
  }
}
  
router.post("/login", createUser);
router.get("/login", getUserByEmail);

module.exports = router