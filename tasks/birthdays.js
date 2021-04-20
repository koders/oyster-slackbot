const Birthday = require("../models/Birthday");
const { postMessage } = require("../slack");

const CHANNEL_NAME = "#test-bot";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function schedule() {
  const birthdays = await Birthday.find({});
  console.log(birthdays);

  birthdays.forEach((birthday) => {
    const now = new Date();
    const month = birthday.date.split(" ")[0];
    const day = birthday.date.split(" ")[1];
    const nextBirthDay = new Date(
      now.getFullYear(),
      months.indexOf(month),
      day,
      11
    );
    if (nextBirthDay - now < 0) {
      nextBirthDay.setFullYear(nextBirthDay.getFullYear() + 1);
    }
    console.log("scheduling", nextBirthDay);
    const timeLeft = nextBirthDay - now;
    console.log(timeLeft);
    // Schedule if within week as timeout only acceps 32bit int, which is about 24 days
    if (timeLeft < 1000 * 60 * 60 * 24 * 7) {
      setTimeout(() => {
        postMessage(CHANNEL_NAME, `Happy birthday, <@${birthday.slackId}>!!!`);
      }, timeLeft);
    }
  });
}

module.exports = {
  schedule,
};
