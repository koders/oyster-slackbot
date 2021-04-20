const slackApi = require("../slack");
const Suggestion = require("../models/Suggestion");

module.exports = async (payload) => {
  const { channel, text, user } = payload.event;
  const commands = text.split(" ");
  const suggestion = new Suggestion({
    text: commands.slice(1).join(" "),
    user,
    date: Date.now(),
  });
  await suggestion.save();
  await slackApi.postMessage(channel, "Your suggestion has been saved.");
};
