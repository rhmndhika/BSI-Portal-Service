const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const MemoryStore = require('memorystore')(session)


require('dotenv').config();


const UserModel = require("./models/Users.js");


const CONNECTION_URL =  process.env.MONGODB_HOST

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser : true
}
);

app.use(
    cors({
    origin: ["https://bsivendorregistration.netlify.app", ,"https://bsivendor-registration.herokuapp.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.set("trust proxy", 1);

app.use(helmet());
app.use(hpp());
app.use(express.json());
app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.use(session({
    cookie:{
        secure: true,
        sameSite: "none",
        maxAge:10 * 10 * 24 * 60
           },
    key: process.env.COOKIE_KEY,
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
    secret: 'secret',
    saveUninitialized: true,
    resave: false,
    }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://bsivendorregistration.netlify.app", "https://bsivendor-registration.herokuapp.com");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
  

app.post("/register", async (req, res) => {
    bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new UserModel({
        email: req.body.email,
        password: hashedPassword,
        role : "User"
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
    });
});


app.post("/login", (req, res) => {
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

            const result = {email : user.email}
            req.session.email = result
            const role = user.role
            req.session.role = role
            res.status(200).send({
                message: "Login Successful",
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
            });
            }).catch((e) => {
                res.status(404).send({
                message: "Email not found",
                e,
        });
    });
});

app.get("/login", (req, res) => {

    if(req.session.email) {
            res.send({loggedIn: true, email: req.session.email, role : req.session.role })
       
    } else {
        res.send({loggedIn: false})
    }

  
});

app.get("/logout", (req, res) => {
   res.clearCookie(process.env.COOKIE_KEY)
   return res.redirect("/");
});



app.listen(process.env.PORT || 3001 , ()=> {
    console.log(`running on port`)
});