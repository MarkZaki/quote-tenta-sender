const request = require("request");
const dotenv = require("dotenv").config();
const cron = require("node-cron");

const sendToTenta = (author, quote) => {
  request.post(`https://tenta.me/${process.env.TENTA_CODE}`, {
    json: { title: author, description: quote, options: {} },
  });
};

const GetRandomQuote = () => {
  request.get("https://api.quotable.io/random", {}, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const { content, author } = JSON.parse(body);
      sendToTenta(author, content);
    }
  });
};

const MyDailyQuote = () => {
  sendToTenta(
    "Daily Quote",
    "Your Choices is What You Are, Not Your Money Or Status. and Good Morals Are Always Rewarded"
  );
};

cron.schedule("0 6 * * *", () => {
  MyDailyQuote();
});

cron.schedule("0 20 * * *", () => {
  MyDailyQuote();
});

cron.schedule("0 10 * * *", () => {
  GetRandomQuote();
});

cron.schedule("0 15 * * *", () => {
  GetRandomQuote();
});

cron.schedule("0 18 * * *", () => {
  GetRandomQuote();
});
