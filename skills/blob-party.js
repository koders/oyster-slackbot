const slackApi = require("../slack");

module.exports = async (payload) => {
  const { channel } = payload.event;
  return await slackApi.postMessage(
    channel,
    `:yay::yay::yay::yay::yay::yay::yay::yay::yay::yay::yay::yay::yay::yay::yay::yay:\n:yay::yay::yay: Let’s get the blob party starting!! :yay::yay::yay:\n:yay::yay::yay::yay::yay::yay::yay::yay::yay::yay::yay::yay::yay::yay::yay::yay:`
  );
};
