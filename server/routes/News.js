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

const getNewsById = async (req, res) => {
  const Id = req.params.id;

  try {
    const newsId = await NewsModel.findById({_id : Id}).orFail();
    return res.send(newsId);
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

router.post("/news/createNews", createNews);
router.get("/news/allNews", getAllNews);
router.get("/news/details/:id", getNewsById);

module.exports = router