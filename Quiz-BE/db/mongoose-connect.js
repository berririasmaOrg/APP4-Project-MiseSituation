const mongoose = require("mongoose");
const mongoURI =  "mongodb+srv://root:root@7-quiz.srrchab.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));