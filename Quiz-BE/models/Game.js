const { model, Schema } = require("mongoose");

const gameSchema = Schema(
  {
    score: { type: Number, required: true },
    time: { type: Number, required: true }
  },
  { timestamps: true }
);


module.exports = model("Game", gameSchema);