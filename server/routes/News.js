const express = require("express");
const router = express.Router();

const NewsModel = require("../models/News");

const createNews = async (req, res) => {

  try {
    req.body.Tags = req.body.Tags.replace(/\s/g, '').split(",").map(function(tag) {
      return { "name": tag };
    });

    var News = new NewsModel(req.body);

    await News.save();
    res.json(News);
  } catch (err) {
    res.json(err);
  }
}

router.post("/news/createNews", createNews);

module.exports = router