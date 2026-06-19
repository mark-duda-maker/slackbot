require("dotenv").config();
const axios = require("axios");

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});
(async () => {
  await app.start();
  console.log("bot is running!");
})();
app.command("/bot-mark-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});
app.command("/bot-mark-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/bot-mark-ping - Check bot latency
/bot-mark-catfact - Get a cat fact
/bot-mark-random-number - Generate a random number between two input numbers`
  });
});
app.command("/stardance-bot-mark-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
})
app.command("/bot-mark-random-number", async ({ command, ack, respond }) => {
  await ack();
  respond({ text: 'Generating a random number between the two numbers you provided...' });
  const a = command.text.split(/[\s,]+/).map(Number);
  if (a.length != 2) {
    return await respond({ text: "Please provide two valid numbers." });
  }
  if (a[0] > a[1]) {
    return await respond({ text: "The minimun number must be less than to the maximum number." });
  }
  else {
    return await respond({ text: 'your number is: ' + (a[0]+Math.floor(Math.random()*(a[1]-a[0]+1))) });
  }
});