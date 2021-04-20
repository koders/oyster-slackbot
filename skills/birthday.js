const slackApi = require("../slack");
const Birthday = require("../models/Birthday");
const User = require("../models/User");

module.exports = async (payload) => {
  const { channel, text, user } = payload.event;
  const commands = text.split(" ");
  console.log("commands", commands);
  if (commands[1] === "add") {
    const birthday = new Birthday({
      slackId: commands[2].slice(0, commands[2].length - 1).slice(2),
      date: commands.slice(3).join(" "),
    });
    await birthday.save();
    await slackApi.postOnlyVisibleToUser(
      channel,
      "Birthday has been saved.",
      user
    );
  }
  if (commands[1] === "list") {
    const birthdays = await Birthday.find();
    const text = await birthdays.reduce(async (acc, b) => {
      const users = await User.find({ slackId: b.slackId });
      const user = users[0];
      return `${acc}*${user.fullName}* - ${b.date}\n`;
    }, "");
    await slackApi.postOnlyVisibleToUser(channel, text, user);
  }
};
