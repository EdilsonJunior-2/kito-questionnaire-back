const express = require("express");

const Questionnaire = require("./models/questionnaire");

const router = new express.Router();

router.get("/", async (_, res) => {
  Questionnaire.findOne().then((r) => res.status(200).send(r ? true : false));
});

router.get(
  "/questionnaires",
  async (req, res) => {
    const name = req.query.name || "";
    Questionnaire.find({ name: new RegExp(name, "i") }).then(
      (questionnaires) => {
        res.status(200).send(
          questionnaires.map((questionnaire) => ({
            name: questionnaire.name,
            id: questionnaire.id,
            difficulty:
              questionnaire.questions.reduce(
                (acc, current) => acc + current.rating,
                0
              ) / questionnaire.questions.length,
          }))
        );
      }
    );
  },
  []
);

router.get("/questionnaire/:id", (req, res) => {
  Questionnaire.findById(
    req.params.id,
    "name questions.options questions.text questions.rating"
  )
    .then((r) => res.status(200).send(r))
    .catch(() =>
      res.status(400).send({
        message:
          "The questionnaire you are looking for doesn't exist anymore or changed, please try another one",
      })
    );
});

router.get("/questionnaire/answers/:id", (req, res) => {
  Questionnaire.findById(req.params.id, "questions.answer")
    .then((r) =>
      res.status(200).send(r.questions.map((question) => question.answer))
    )
    .catch(() =>
      res.status(400).send({
        message:
          "The questionnaire you are looking for doesn't exist anymore or changed, please try another one",
      })
    );
});

router.post("/questionnaire", async (req, res) => {
  const data = req.body;

  await Questionnaire.create({
    name: data.name,
    questions: data.questions,
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = router;
