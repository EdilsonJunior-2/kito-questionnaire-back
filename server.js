const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./src/routes");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const server =
  "mongodb+srv://edilson:KUGYgZ1ysHcdnAAU@questionnaire-db.ass8e.mongodb.net/?retryWrites=true&w=majority&appName=questionnaire-db";

app.use("/", routes);

mongoose
  .connect(server, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`API listening on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
