const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const path = require('path');
const helmet = require('helmet');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MemoryStore = require('memorystore')(session);
const multer = require('multer');
const nodemailer = require("nodemailer");
const http = require("http");
const { Server } = require("socket.io");

require('dotenv').config();

const CONNECTION_URL =  process.env.MONGODB_HOST

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser : true
}
);


app.set("trust proxy", 1);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  },
});

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
    origin: ["http://localhost:3000", "https://bsi-portal-service-production.up.railway.app"], 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus : 200
}));

app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
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
        checkPeriod: 86400000 // prune expired entries every 24h / 1 dayszzzzzssssssszsszzz
      }),
    secret: 'subscribe',
    saveUninitialized: true,
    resave: false,
    }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000" , "https://bsi-portal-service-production.up.railway.app");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
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

  
const registerRoute = require("./routes/Register");
const loginRoute = require("./routes/Login");
const profileRoute = require("./routes/Profile");
const paygRoute = require("./routes/Payg");
const outsourcingRoute = require("./routes/Outsourcing");
const vendorRegistrationRoute = require("./routes/VendorRegistration");
const sosmedProfileRoute = require("./routes/SosmedProfile");
const sosmedPostRoute = require("./routes/Post");
const commentRoute = require("./routes/Comment");
const messageRoute = require("./routes/Message");
const Mes = require("./models/Message");

app.use(registerRoute);
app.use(loginRoute);
app.use(profileRoute);
app.use(paygRoute);
app.use(outsourcingRoute);
app.use(vendorRegistrationRoute);
app.use(sosmedProfileRoute);
app.use(sosmedPostRoute);
app.use(commentRoute);
app.use(messageRoute);

let users = {};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);


  socket.on("userJoin", username => {
    users[socket.id] = username
    socket.join(username)
    socket.join("General Chat");
    console.log("User Object connected to the server : "+users);
    socket.emit("userList", [...new Set(Object.values(users))])
  })

  socket.on("newMessage", newMessage => {
    socket.to(newMessage.room).emit("newMessage", { name : newMessage.name, msg : newMessage.msg, isPrivate : newMessage.isPrivate })
  })

  socket.on("roomEntered", ({ oldRoom, newRoom }) => {
    socket.leave(oldRoom);
    socket.to(oldRoom).emit("newMessage", { name : "NEWS", msg: `${users[socket.id]} just left the room`})
    socket.to(newRoom).emit("newMessage", { name : "NEWS", msg: `${users[socket.id]} just joined the room`})
    socket.join(newRoom);
  })

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined to room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
     Mes.create({Message : data.message, User : data.author, Room : data.room}, function (err, success)  {
      if (err) {
        console.log(err)
      } else {
        console.log(success);
      }
    })
  });

  socket.on('get-messages-history', Room => {
    Mes.find({ Room }).then(result => {
      socket.emit('output-messages', result)
    })
  })

  socket.on("disconnect", () => {
    delete users[socket.id]
    socket.emit("userList", [...new Set(Object.values(users))]);
    console.log("User after disconnected :"+users);
  });
});


app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    req.session = null;
    res.redirect("/");
  });
});

app.post("/sendNotification", function (req, res) {
  let mailOptions = {
    from: process.env.EMAIL,
    to: "rahmandhika5@gmail.com",
    subject: "BSI Vendor Registration",
    text: "Hi There!!, this is a automatic notification email when user approved or rejected the draft.",
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


server.listen(process.env.PORT || 3001 , ()=> {
  console.log(`Still Running on port 3001`);
});

