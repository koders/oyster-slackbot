// Import express and request modules
require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const botController = require("./bot.js");

const PORT = process.env.PORT || 1337;
// Instantiates Express and assigns our app variable to it
const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.info(`Express server started on ${PORT}`);
});

const mongoose = require("mongoose");
const { dbUser, dbPass } = process.env;
// mongoose.connect(`mongodb://${dbUser}:${dbPass}@ds261155.mlab.com:61155/heroku_58w9h6k4`, {useNewUrlParser: true});
mongoose.connect(`mongodb://localhost:27017/oyster-slackbot`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => res.send("Hello world!"));

app.post("/slack/events", botController);

const birthdays = require("./tasks/birthdays");
birthdays.schedule();
