const { model, Schema } = require("mongoose");

const answerSchema = Schema(
  {
    answer: { type: String, required: true },
    correct: { type: Boolean, default: false },
  },
  { timestamps: true }
);


module.exports = model("Answer", answerSchema);