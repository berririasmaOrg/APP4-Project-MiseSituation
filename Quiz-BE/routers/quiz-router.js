
const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Answer = require("../models/Answer");

const authenticate = require('../middlewares/authentication-mw');


/**
 * Get all quizs
 */
router.get("/quiz", function (req, res) {
    console.log("GET /quiz");
    const filter = req.query.filter;
    var condition = filter
      ? { filter: { $regex: new RegExp(filter), $options: "i" } }
      : {};
  
    const quizs = Quiz.find(condition)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving quizs.",
        });
      });
  });
  
  /**
   * create quiz
   */
  router.post("/create-quiz", function (req, res) {
    console.log("POST /create-quiz");
    console.log(req.body);
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    const quiz = new Quiz({
      quizName: req.body.quizName,
      public: req.body.public,
      createdBy: req.body.createdBy,
    });
  
    quiz
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Quiz.",
        });
      });
  });
  
  /**
   * get quiz by id
   */
  router.get("/quiz/:id", function (req, res) {
    console.log("GET /quiz/:id");
    const id = req.params.id;
  
    Quiz.findById(id)
      .then((data) => {
        if (!data)
          res.status(404).send({ message: "Not found Quiz with id " + id });
        else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retrieving Quiz with id=" + id });
      });
  });
  
  /**
   * Update quiz by id
   */
  router.put("/quiz/:id", async function (req, res) {
    console.log("POST /update-quiz");
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.params.id;
    Quiz.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Quiz with id=${id}. Maybe Quiz was not found!`,
          });
        } else res.send({ message: "Quiz was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Quiz with id=" + id,
        });
      });
  });
  
  /**
   * get questions by quiz id
   */
  router.get("/quiz/:id/questions", function (req, res) {
    console.log("GET /quiz/:id/questions");
    const id = req.params.id;
  
    Question.find({ quizId: id })
      .then((data) => {
        if (!data)
          res.status(404).send({ message: "Not found Question with id " + id });
        else res.send(data);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving Question with id=" + id });
      });
  });
  


module.exports = router;

