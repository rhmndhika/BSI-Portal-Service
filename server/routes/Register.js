const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const UserModel = require("../models/Users.js");

const createUserAccount = (req, res) => {
  const role = new RegExp('bsi', 'gi').test(req.body.email) ? 'Admin' : 'User';
  
     bcrypt
      .hash(req.body.password, 10)
      .then((hashedPassword) => {
        // create a new user instance and collect the data
        const user = new UserModel({
          username : req.body.username,
          email: req.body.email,
          password: hashedPassword,
          role : role
        });
        // save the new user
        user
          .save()
          // return success if the new user is added to the database successfully
          .then((result) => {
            res.status(201).send({
              message: "User Created Successfully",
              result,
            });
          })
          // catch error if the new user wasn't added successfully to the database
          .catch((error) => {
            res.status(500).send({
              message: "Error creating user",
              error,
            });
          });
      })
      // catch error if the password hash isn't successful
      .catch((e) => {
        res.status(500).send({
          message: "Password was not hashed successfully",
          e,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message : "Duplicate Email",
          err
        })
      })
}

router.post("/register", createUserAccount);

module.exports = router