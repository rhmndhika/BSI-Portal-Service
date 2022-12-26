const express = require("express");
const router = express.Router();

const NewsModel = require("../models/News");

const createNews = async (req, res) => {

  try {
    const News = new NewsModel({
      Email : req.body.Email,
      Username : req.body.Username,
      Title : req.body.Title,
      Tags : req.body.Tags,
      Content : req.body.Content,
    })
    await News.save();
    res.json(News);
  } catch (err) {
    res.json(err);
  }
}

const getAllNews = async (req, res) => {

  try {
    const news = await NewsModel.find({}).orFail();
    return res.send(news);
  } catch(err) {
    return res.status(500).send({
      message: err.message
    })
  }
  
}

router.post("/news/createNews", createNews);
router.get("/news/allNews", getAllNews);

module.exports = router