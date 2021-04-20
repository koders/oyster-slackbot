const mongoose = require("mongoose");

const User = {
  slackId: String,
  teamId: String,
  slackName: String,
  fullName: String,
  image: String,
  phone: String,
  title: String,
  email: String,
};

module.exports = mongoose.model("User", User);
