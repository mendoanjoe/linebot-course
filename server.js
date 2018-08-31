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
* Start Server
*/
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
});