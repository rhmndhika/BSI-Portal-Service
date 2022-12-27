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

const updateNewsById = async (req, res) => {
  const Id = req.body.id;

  try {
    const updateNews = await NewsModel.findByIdAndUpdate({_id : Id}, {
      Title : req.body.Title,
      Tags : req.body.Tags,
      Content : req.body.Content,
    })
      return res.send(updateNews)
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

const deleteNewsById = async (req, res) => {
  const Id = req.params.id;

  try {
    const deleteNews = await NewsModel.findByIdAndDelete({_id : Id});
    return res.send(deleteNews);
  } catch (err) {
    return res.status(500).send({
      message: err.message
    })
  }
}

router.post("/news/createNews", createNews);
router.get("/news/allNews", getAllNews);
router.get("/news/details/:id", getNewsById);
router.put("/news/details/:id/update", updateNewsById);
router.delete("/news/details/:id/delete", deleteNewsById);

module.exports = router