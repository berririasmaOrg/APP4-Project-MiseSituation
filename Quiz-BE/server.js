const express = require('express');
const cors = require('cors');
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
const auth = require('./routers/auth-router');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', api);
app.use('/auth', auth);

app.get('/', function (req, res) {
    res.send('hello world');
});

app.listen(process.env.port || 3000, function () {
    console.log('now listening for requests on port 3000');
});

