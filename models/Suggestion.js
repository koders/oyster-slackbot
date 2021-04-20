const mongoose = require("mongoose");

const Suggestion = {
  text: String,
  user: String,
  date: Date,
};

module.exports = mongoose.model("Suggestion", Suggestion);
