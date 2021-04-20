const { createEventAdapter } = require("@slack/events-api");
const { WebClient } = require("@slack/web-api");
const Command = require("./models/Command");

const BOT_NAME = "Oyster";

module.exports = async (req, res) => {
  const payload = req.body;
  //   if (payload && payload.type === "url_verification") {
  //     return res.json({
  //       challenge: payload.challenge,
  //     });
  //   }
  // immediately respond to slack that request is received
  console.log("PAYLOAD", payload);
  res.sendStatus(200);

  try {
    // if (payload) {
    //   const parsedPayload = JSON.parse(payload);
    //   if (parsedPayload && parsedPayload.type === "interactive_message") {
    //     require("./skills/review")(parsedPayload);
    //     return;
    //   }
    // }

    const { text, type, username } = payload.event;
    const commands = text.split(" ");
    const isCommand = commands[0]?.startsWith("!");
    const mainCommand = commands[0]?.toLowerCase().slice(1);
    // Bot is mentioned
    if (
      payload.event &&
      isCommand &&
      type === "message" &&
      username !== BOT_NAME
    ) {
      const command = new Command({
        text,
        date: Date.now(),
        user: payload.event.user,
      });
      command.save();
      require("./skills/" + mainCommand)(payload);
    }
  } catch (e) {
    console.error("Error occurred processing bot query:", e);
    require("./skills/fallback")(payload);
  }
};
