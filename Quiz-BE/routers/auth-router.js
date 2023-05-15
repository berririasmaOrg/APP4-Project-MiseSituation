const router = require("express").Router();
const Bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const salt = Bcrypt.genSaltSync(10);
  const hashPass = Bcrypt.hashSync(password, salt);
  User.create({ username, password: hashPass })
    .then(user => {
      res.send({
        message: "user created", user 
      });
    });
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.send({ message: "Username or password incorrect" });
  }
  if (Bcrypt.compareSync(password, user.password)) {
    res.send({
      message: "success",
      user,
      jwt: jwt.sign({
        username: user.username,
        id: user._id
      }, "secret", { expiresIn: "1h" })
    });
  } else {
    res.send({ message: "Username or password incorrect" });
  }
});


router.post("/logout", (req, res) => {
  res.send({ message: "You are now logged out" });
});

router.get("/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;