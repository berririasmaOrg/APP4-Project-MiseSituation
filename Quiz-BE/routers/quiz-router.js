
const express = require('express');
const router = express.Router();


router.get('/create-quiz', function (req, res) {
    res.send('hello world from quiz router');
});


module.exports = router;

