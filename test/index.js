const axios = require('axios');

const port = process.env.PORT || 3000;
const host = process.env.URL || "http://localhost"
const serviceUrl = host+':'+port 

module.exports = {
  postEvent() {
    return axios
      .post(`${serviceUrl}/webhook`, {
        "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
        "type": "message",
        "timestamp": 1462629479859,
        "source": {
          "type": "user",
          "userId": "U4af4980629"
        },
        "message": {
          "id": "325708",
          "type": "text",
          "text": "Hello, world!"
        }
      })
      .then(res => res.data)
      .catch(error => console.log(error));
  }
};