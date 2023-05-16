const { model, Schema } = require("mongoose");
const quizSchema = Schema(
  {
    quizName: { type: String, required: true },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },

    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    games: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
        required: true
      }
    ],
    public: { type: Boolean, default: false },
  }, { timestamps: true });


module.exports = model("Quiz", quizSchema);