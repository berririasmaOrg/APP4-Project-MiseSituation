
const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/authentication-mw');


router.get('/create-quiz', authenticate, function (req, res) {
    res.send('hello world from quiz router');
});


module.exports = router;

