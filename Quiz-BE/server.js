const express = require('express');
const bodyParser = require('body-parser');

// import models
const User = require('./models/User');
const Question = require('./models/Question');
const Answer = require('./models/Answer');
const Quiz = require('./models/Quiz');

// connect to mongodb
require('./db/mongoose-connect');

// import routers
const app = express();
const api = require('./routers/quiz-router');

// use api router
app.use('/api', api);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.get('/', function (req, res) {

    // const user = new User({
    //     username: 'test',
    //     password: 'test',
    //     quizzes: []
    // });

    // user.save();

    // const quiz = new Quiz({
    //     quizName: 'Sample Quiz',
    //     questions: [
    //         new Question({
    //             question: 'What is the capital of France?',
    //             answers: [
    //                 new Answer({ answer: 'Paris', correct: true }),
    //                 new Answer({ answer: 'London', correct: false }),
    //                 new Answer({ answer: 'Berlin', correct: false }),
    //                 new Answer({ answer: 'Madrid', correct: false })
    //             ]
    //         }),

    //         new Question({
    //             question: 'What is the capital of Spain?',
    //             answers: [
    //                 new Answer({ answer: 'Paris', correct: false }),
    //                 new Answer({ answer: 'London', correct: false }),
    //                 new Answer({ answer: 'Berlin', correct: false }),
    //                 new Answer({ answer: 'Madrid', correct: true })
    //             ]
    //         }),

    //         new Question({
    //             question: 'What is the capital of Germany?',
    //             answers: [
    //                 new Answer({ answer: 'Paris', correct: false }),
    //                 new Answer({ answer: 'London', correct: false }),
    //                 new Answer({ answer: 'Berlin', correct: true }),
    //                 new Answer({ answer: 'Madrid', correct: false })
    //             ]
    //         }),
    //     ],

    //     public: true,
    //     quizID: 1
        
    // });

    // quiz.save();
    // res.send('Sample quiz and user created');
});

app.listen(process.env.port || 3000, function () {
    console.log('now listening for requests on port 3000');
});

