
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const Game = require("../models/Game");

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
  

// GET all users
router.get('/users', async function (req, res) {
    console.log("GET /users");
    const USERS = await User.find();
    res.status(200).json({
        users: USERS
    });
});

// GET search user by username, else return an error
router.get('/user/:username', async function (req, res) {
    const name = req.body.username;
    console.log("GET /user/" + name);
    const USER = await User.findOne( name );
    if (!USER) {
        res.status(404).json({
            error: "User with username "+ req.body.username +" not found"
        })
    } else {
        res.status(200).json({
            user: USER
        });
    }
});

// POST create a new user
router.post('/user', function (req, res) {
    console.log("POST /user   |   " + JSON.stringify(req.body));

    if (!req.body.username || !req.body.password) {
        res.status(400).send();
    } else {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            quizzes: []
        });
    
        user.save();
    
        res.status(200).send();
    }
});

module.exports = router;

