const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const MemoryStore = require('memorystore')(session);
const multer = require('multer');
const nodemailer = require("nodemailer");

require('dotenv').config();

const UserModel = require("./models/Users.js");
const PaygDataModel = require('./models/PaygDatas.js');
const UserProfileModel = require("./models/UserProfiles.js")


const CONNECTION_URL =  process.env.MONGODB_HOST

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser : true
}
);

app.set("trust proxy", 1);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() +  path.extname(file.originalname))
  }
});

const upload = multer({storage: storage});

app.use(
    cors({
    origin: ["http://localhost:3000", ,"https://empty-test-project.herokuapp.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

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
        sameSite: "production" ? "none" : "lax",
        maxAge: 1 * 60 * 60 * 1000
           },
    key: process.env.COOKIE_KEY,
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
    secret: 'subscribe',
    saveUninitialized: true,
    resave: false,
    }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000", "https://empty-test-project.herokuapp.com");
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

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
  });

transporter.verify((err, success) => {
  err
  ? console.log(err)
  : console.log(`=== Server is ready to take messages: ${success} ===`);
});

  
app.post("/register", async (req, res) => {

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
    });
});


app.post("/login", (req, res) => {
  // UserModel.findOneAndUpdate({ email: { $regex : "bsi"} || req.body.email }, {$set : {"role" : "Admin"}}).then((user)
 
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
});

app.get("/login", (req, res) => {

  if(req.session.email) {
    res.send({loggedIn: true, email: req.session.email, role : req.session.role, username : req.session.username })     
  } else {
    res.send({loggedIn: false})
  }
});

app.get("/logout", (req, res) => {
   res.clearCookie("userId", {path : "/"})
   res.status(200).json({ success: true, message: "User logged out successfully" });
});

app.post("/paygdata", upload.array('file', 20), async (req, res) => {
   
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

app.get("/paygdata", (req, res) => {
  PaygDataModel.find({Email : req.session.email}, (err, result) => {

   if (err) {
      res.send(err)
   } else {
      res.send(result)
   }
  })
})

app.get("/paygdata/:id", (req, res) => {
  const Id = req.params.id;
  
  PaygDataModel.findById({_id : Id}, (err, result) => {
      if (err) {
          res.send(err)
      }else {
          res.send(result)
      }
  })
});

app.delete("/deletepaygdata/:id", (req, res) => {
  const Id = req.params.id;

  PaygDataModel.findByIdAndDelete({_id : Id}, (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

app.post("/createprofile", async (req, res) => {

  const Profile = new UserProfileModel({
    Email : req.body.Email,
    FullName : req.body.FullName,
    Entity : req.body.Entity,
    SupplierName : req.body.SupplierName
  })

  await Profile.save();
  res.send(Profile);
})

app.get("/getprofile", async (req, res) => {
  UserProfileModel.findOne({Email : req.session.email}, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.put("/updatepaygdata", upload.array('file', 20), (req, res) => {

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
})

app.post("/sendnotification", function (req, res) {
  let mailOptions = {
    from: process.env.EMAIL,
    to: "rahmandhika5@gmail.com",
    subject: "BSI Vendor Registration",
    text: "Hi There !, this is a automatic notification email when user approved or rejected the draft.",
  };
 
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
      res.json({ status: "Email sent" });
    }
  });
 });

 app.put("/updateSubmitted",  (req, res) => {

  const Id = req.body.id;
  const submitted = req.body.submitted;

  PaygDataModel.findByIdAndUpdate({_id : Id}, { $set : {"submitted" : submitted}},  (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
  })
});

app.put("/updateStatus", (req, res) => {
  const Id = req.body.id;
  const status = req.body.status;

   PaygDataModel.findByIdAndUpdate({_id : Id}, { $set : {"status" : status}},  (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
  })
});

app.get("/admin/paygdata", (req, res) => {
  PaygDataModel.find({BuyerName : req.session.username}, (err, result) => {
    if (err) {
       res.send(err)
    } else {
       res.send(result)
    }
   })
})

app.get("/admin/paygdata/:id", (req, res) => {
  const Id = req.params.id;
  
  PaygDataModel.findById({_id : Id}, (err, result) => {
      if (err) {
          res.send(err)
      }else {
          res.send(result)
      }
  })
});

app.listen(process.env.PORT || 3001 , ()=> {
    console.log(`running on port`)
});