const { model, Schema } = require("mongoose");
const quizSchema = Schema(
  {
    quizID: { type: Number, required: true },
    quizName: { type: String, required: true },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },

    ],
    public: { type: Boolean, default: false },
  }, { timestamps: true });


module.exports = model("Quiz", quizSchema);