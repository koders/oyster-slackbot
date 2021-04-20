const mongoose = require("mongoose");

const Birthday = {
  slackId: String,
  date: String,
};

module.exports = mongoose.model("Birthday", Birthday);
