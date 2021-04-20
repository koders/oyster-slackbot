const slackApi = require("../slack");

module.exports = async (payload) => {
  const { channel } = payload.event;
  return await slackApi.postMessage(channel, `Sorry, I didn't quite get you.`);
};
