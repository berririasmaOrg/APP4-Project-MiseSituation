const express = require('express');
const bodyParser = require('body-parser');


// import routers

const app = express();
const api = require('./routers/quiz-router');

// use api router

app.use('/api', api);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json

app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.send('hello world');
});

app.listen(process.env.port || 3000, function () {
    console.log('now listening for requests on port 3000');
});

