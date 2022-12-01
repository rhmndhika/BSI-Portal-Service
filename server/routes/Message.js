const express = require("express");
const router = express.Router();

const MessageModel = require("../models/Message");

const getMessageByEmail = (req, res) => {

    MessageModel.find({Room : 2001}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
}


router.get("/livechat/message", getMessageByEmail);

module.exports = router