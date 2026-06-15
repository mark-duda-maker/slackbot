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
app.command("/stardance-bot-mark-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});
app.command("/stardance-bot-mark-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/stardance-bot-mark-ping - Check bot latency
/stardance-bot-mark-catfact - Get a cat fact`
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

