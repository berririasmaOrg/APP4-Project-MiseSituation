const { model, Schema } = require("mongoose");

const userSchema = Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    quizzes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
      },
    ],
    games: [
      {
        type: Schema.Types.ObjectId,
        ref: "Game",
        required: true
      }
    ] 
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);