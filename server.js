/* 
* Module Loads
*/
const app = require('express')();
const line = require('@line/bot-sdk');
const logger = require('morgan');

/*
* Http Logger
*/
app.use(logger('combined'));

/*
* Configs
* Url : https://developers.line.me/console/
*/
const channelAccessToken = process.env.CHANNEL_ACCESS_TOKEN || "YOUR CHANNEL ACCESS TOKEN";
const channelSecret = process.env.CHANNEL_SECRET || "YOUR CHANNEL SECRET";
const config = {
  'channelAccessToken': channelAccessToken,
  'channelSecret': channelSecret,
};

/*
* Create Line Service
*/
const client = new line.Client(config);

/*
* Route Root End Point
* Access on : host:port/
*/
app.get('/', (req, res) => {
  res.send('Hello World!');
});

/*
* Route Webhook End Point
* Send request on : host:port/webhook
*/
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

/*
* Webhook Event Request Handler
* To : handle message coming from line server
*/
function handleEvent(event) {
  /*
  * only get type = message and message.type = text
  * Url : https://developers.line.me/en/reference/messaging-api/#message-event
  */
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  /*
  * Creating chat response to line server
  * event.message.text is text from user
  */
  const echo = { type: 'text', text: event.message.text };

  /*
  * Reply request to user on line server
  */
  return client.replyMessage(event.replyToken, echo);
}

/*
* Start Server
*/
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
});