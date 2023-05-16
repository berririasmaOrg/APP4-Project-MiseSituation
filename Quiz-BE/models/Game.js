const { model, Schema } = require("mongoose");

const gameSchema = Schema(
  {
    score: { type: Number },
    time: { type: Number },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Game", gameSchema);
