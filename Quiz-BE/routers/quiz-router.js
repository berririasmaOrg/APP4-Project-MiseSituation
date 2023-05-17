const express = require("express");
const User = require("../models/User");
const router = express.Router();
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const Game = require("../models/Game");

const authenticate = require("../middlewares/authentication-mw");

/**
 * Get all quizs
 */
router.get("/quiz", function (req, res) {
  console.log("GET /quiz");
  // Récupérer les filtres depuis la requête
  const filters = req.query;
  Quiz.find(filters).populate("createdBy", "username")
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
  console.log(req.body)
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
        console.error(err)
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

  Quiz.findById(id).populate("createdBy", "username")
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
 * get questions by quiz id
 */
router.get("/quiz/:quizId/questions", (req, res) => {
  const quizId = req.params.quizId;
  console.log("GET /quiz/" + quizId + "/questions");
  // Vérifier si le quiz existe
  Quiz.findById(quizId)
    .populate({
      path: "questions",
      populate: {
        path: "answers",
        model: "Answer",
      },
    })
    .then((quiz) => {
      if (!quiz) {
        return res
          .status(404)
          .json({ message: "Quiz not found with id " + quizId });
      }

      // Récupérer toutes les questions et réponses associées
      const questions = quiz.questions;

      res.status(200).json({
        message: "Questions and answers retrieved successfully",
        questions,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding quiz", error: err });
    });
});

/**
 * POST create a new question and answers and put them in quiz
 */
router.post("/question", (req, res) => {
  const { quizId, question, answers } = req.body;
  console.log("POST /question   |   " + JSON.stringify(req.body));
  // Vérifier si le quiz existe
  Quiz.findById(quizId)
    .then((quiz) => {
      if (!quiz) {
        return res
          .status(404)
          .json({ message: "Quiz not found with id " + quizId });
      }
      // Créer la question
      const questionData = {
        question: question,
        answers: [],
      };

      // Créer les réponses de la question
      const answerPromises = answers.map((answer) => {
        return Answer.create({
          answer: answer.answer,
          correct: answer.correct,
        });
      });

      Promise.all(answerPromises)
        .then((createdAnswers) => {
          createdAnswers.forEach((answer) => {
            questionData.answers.push(answer._id);
          });

          Question.create(questionData)
            .then((createdQuestion) => {
              // Ajouter la question au quiz
              quiz.questions.push(createdQuestion._id);
              quiz.save();

              res.status(201).json({
                message: "Question added to quiz successfully",
                question: createdQuestion,
              });
            })
            .catch((err) => {
              res
                .status(500)
                .json({ message: "Error creating question", error: err });
            });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "Error creating answers", error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding quiz", error: err });
    });
});

// GET all users
router.get("/users", async function (req, res) {
  console.log("GET /users");
  const USERS = await User.find();
  res.status(200).json({
    users: USERS,
  });
});

// GET search user by username, else return an error
router.get("/user/:username", async function (req, res) {
  const name = req.body.username;
  console.log("GET /user/" + name);
  const USER = await User.findOne(name);
  if (!USER) {
    res.status(404).json({
      error: "User with username " + req.body.username + " not found",
    });
  } else {
    res.status(200).json({
      user: USER,
    });
  }
});

// PUT create a new user
router.post("/user", function (req, res) {
  console.log("POST /user   |   " + JSON.stringify(req.body));

  if (!req.body.username || !req.body.password) {
    res.status(400).send();
  } else {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.save();

    res.status(200).send();
  }
});

/**
 * POST create a new game
 */
router.post("/game", (req, res) => {
  const { quizId, userId } = req.body;
  console.log("POST /game   |   " + JSON.stringify(req.body));
  // Vérifier si le quiz et l'utilisateur existent
  Promise.all([Quiz.findById(quizId), User.findById(userId)])
    .then(([quiz, user]) => {
      if (!quiz) {
        return res
          .status(404)
          .json({ message: "Quiz not found with id " + quizId });
      }

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found with id " + userId });
      }

      // Créer la partie
      const gameData = {
        quiz: quiz._id,
        user: user._id,
      };

      Game.create(gameData)
        .then((createdGame) => {
          res
            .status(201)
            .json({ message: "Game created successfully", game: createdGame });
        })
        .catch((err) => {
          res.status(500).json({ message: "Error creating game", error: err });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error finding quiz or user", error: err });
    });
});

/**
 * Update game by id register score + time
 */
router.put("/game", (req, res) => {
  const { gameId, score } = req.body;
  console.log("PUT /game   |   " + JSON.stringify(req.body));
  // Vérifier si la partie existe
  Game.findById(gameId)
    .then((game) => {
      if (!game) {
        return res
          .status(404)
          .json({ message: "Game not found with id " + gameId });
      }

      // Vérifier si la partie est déjà terminée
      if (game.time) {
        return res.status(400).json({ message: "Game already finished" });
      }

      // Calculer le temps écoulé
      const startTime = new Date(game.createdAt);
      const endTime = new Date();
      const elapsedSeconds = Math.floor((endTime - startTime) / 1000);

      // Mettre à jour le score et le temps écoulé
      game.score = score;
      game.time = elapsedSeconds;

      // Sauvegarder les modifications de la partie
      game
        .save()
        .then((updatedGame) => {
          res.json({ message: "Game updated successfully", game: updatedGame });
        })
        .catch((err) => {
          res.status(500).json({ message: "Error updating game", error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding game", error: err });
    });
});

/**
 * GET ranking for a quiz
 */
router.get("/quiz/:quizId/ranking", (req, res) => {
  const quizId = req.params.quizId;
  console.log("GET /quiz/" + quizId + "/ranking");
  // Récupérer toutes les parties terminées pour le quiz donné
  Game.find({ quiz: quizId, time: { $exists: true } })
    .populate("user", "username")
    .sort({ score: -1, time: 1 }) // Trier par ordre décroissant du score
    .then((games) => {
      const ranking = games.map((game, index) => ({
        rank: index + 1, // Classement (1 pour le premier, 2 pour le deuxième, etc.)
        username: game.user.username,
        score: game.score,
      }));

      res.json({ ranking });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving ranking", error: err });
    });
});

/**
 * GET ranking of user
 */
router.get("/user/:userId/ranking", (req, res) => {
  const userId = req.params.userId;
  console.log("GET /user/" + userId + "/ranking");
  // Récupérer tous les quizzes
  Quiz.find()
    .then((quizzes) => {
      const quizIds = quizzes.map((quiz) => quiz._id);

      // Récupérer le classement de l'utilisateur dans chaque quiz
      const rankingPromises = quizIds.map((quizId) => {
        return Game.find({ quiz: quizId, time: { $exists: true } })
          .populate("user", "username")
          .sort({ score: -1, time: 1 }) // Trier par ordre décroissant du score, puis par ordre croissant du temps
          .then((games) => {
            const userRanking = games.findIndex(
              (game) => game.user._id.toString() === userId
            );

            if (userRanking === -1) {
              // L'utilisateur n'a pas terminé de partie pour ce quiz, on ne l'inclut pas dans le classement
              return null;
            }

            return {
              quizId: quizId.toString(),
              quizName: quizzes.find(
                (quiz) => quiz._id.toString() === quizId.toString()
              ).quizName,
              userRanking: userRanking + 1, // Ajouter 1 pour obtenir le classement (1 pour le premier, 2 pour le deuxième, etc.)
            };
          });
      });

      // Attendre que tous les classements soient récupérés
      Promise.all(rankingPromises)
        .then((results) => {
          // Filtrer les résultats pour exclure les entrées nulles (quiz non terminés par l'utilisateur)
          const ranking = results.filter((result) => result !== null);

          res.json({ ranking });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "Error retrieving ranking", error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error retrieving quizzes", error: err });
    });
});

module.exports = router;
