const expect = require('chai').expect;
const nock = require('nock');

const postEvent = require('./index').postEvent;

const port = process.env.PORT || 3000;
const host = process.env.URL || "http://localhost";
const serviceUrl = host+':'+port;

describe('Post webhook test', () => {
  beforeEach(() => {
    nock(serviceUrl)
      .post('/webhook', {
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
      .reply(200, { type: 'text', text: "Hello, world!" });
  });

  it('Post text events to server', () => {
    return postEvent()
      .then(response => {
        expect(typeof response).to.equal('object');

        expect(response.type).to.equal('text');
        expect(response.text).to.equal('Hello, world!');
      });
  });
});