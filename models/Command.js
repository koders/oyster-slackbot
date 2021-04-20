const mongoose = require("mongoose");

const Command = {
  text: String,
  user: String,
  date: Date,
};

module.exports = mongoose.model("Command", Command);
