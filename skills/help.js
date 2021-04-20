const slackApi = require("../slack");

module.exports = async (payload) => {
  const { channel, user } = payload.event;
  const commands = [
    { title: "!help", description: "Show help" },
    { title: "!joke [$category]", description: "Brighten the day" },
    { title: "!joke categories", description: "Joke category list" },
    { title: "!blob-party", description: "Get the blob party started!" },
    {
      title: "!birthday add @User $month $day",
      description: 'Add birthday in format "!birthday add @John February 4"',
    },
    { title: "!birthday list", description: "List all birthdays" },
    {
      title: "!suggest $improvement",
      description: "Add suggestion what you want to see from Oyster slackbot",
    },
  ];
  const message = commands.map(
    (command) => `*${command.title}* | ${command.description}\n`
  );
  return await slackApi.postOnlyVisibleToUser(
    channel,
    "This is the stuff I know:\n" + message.join(""),
    user
  );
};
