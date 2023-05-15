const { model, Schema } = require("mongoose");

const questionSchema = Schema(
  {
    question: { type: String, required: true },
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Answer",
        required: true,
      },
    ]
  },
  { timestamps: true }
);

module.exports = model("Question", questionSchema);