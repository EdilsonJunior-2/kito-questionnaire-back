const mongoose = require("mongoose");

// Schemas
const questionnaireSchema = new mongoose.Schema({
  name: { type: String, required: true },
  questions: [
    {
      text: { type: String, required: true },
      options: { type: [String], required: true },
      answer: { type: Number, required: true },
      rating: { type: Number, required: true },
    },
  ],
});

const Questionnaire = mongoose.model("Questionnaire", questionnaireSchema);

module.exports = Questionnaire;
