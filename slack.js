const { WebClient } = require("@slack/web-api");
const User = require("./models/User");
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

const postMessage = async (channel, text) =>
  await web.chat.postMessage({ channel, text });

const replyToMessage = async (channel, text, thread_ts) =>
  await web.chat.postMessage({ channel, text, thread_ts });

const postOnlyVisibleToUser = async (channel, text, user) =>
  await web.chat.postEphemeral({ channel, text, user });

const sendDM = async (userID, text) =>
  await web.chat.postMessage({ channel: userID, text });

const postInteractiveMessage = async (channel, text, attachments) => {
  await web.chat.postMessage({ channel, text, attachments });
};

async function seed() {
  const response = await web.users.list();
  const users = response.members;
  // users.forEach((u) => {
  //   console.log(u);
  //   User.create({
  //     slackId: u.id,
  //     teamId: u.team_id,
  //     slackName: u.name,
  //     fullName: u.profile.real_name,
  //     image: u.profile.image_original,
  //     phone: u.profile.phone,
  //     title: u.profile.title,
  //     email: u.profile.email,
  //   });
  // });
  console.log(
    users.map((u) => {
      return { id: u.id, n: u.profile?.real_name };
    })
  );
}

// seed();

module.exports = {
  postMessage,
  replyToMessage,
  postOnlyVisibleToUser,
  sendDM,
  postInteractiveMessage,
};
