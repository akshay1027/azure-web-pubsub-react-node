const express = require('express');
const { WebPubSubServiceClient } = require('@azure/web-pubsub');
const { WebPubSubEventHandler } = require('@azure/web-pubsub-express');
const path = require("path");

const app = express();
// const randomNumber = Math.floor((Math.random() * 100) + 1);
const hubName = 'Hub';
console.log(hubName);
const port = 8080;

let connectionString = 'Endpoint=https://tfo-az-dev-qrcode01.webpubsub.azure.com;AccessKey=/9ieb51ZoKi1+gplmEH8tYYMOF7S0sIAR5C1gL+Cn1k=;Version=1.0';
console.log('hi from outside handler');
let serviceClient = new WebPubSubServiceClient(connectionString, hubName);
let handler = new WebPubSubEventHandler(hubName, {
  path: '/eventhandler',
  onConnected: async req => {
    console.log('hi');
    console.log(`${req.context.userId} connected`);
    console.log(req.context.userId);
    await serviceClient.sendToAll({
      type: "system",
      message: `${req.context.userId} joined`
    });
  },

  handleUserEvent: async (req, res) => {
    if (req.context.eventName === 'message') {
      await serviceClient.sendToAll({
        from: req.context.userId,
        message: req.data
      });
    }
    res.success();
  }
});

app.use(handler.getMiddleware());

app.get('/negotiate', async (req, res) => {
  let id = req.query.id;
  if (!id) {
    res.status(400).send('missing user id');
    return;
  }
  let token = await serviceClient.getClientAccessToken({ userId: id });
  res.json({
    url: token.url
  });
});

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.listen(port, () => console.log(`Event handler listening at http://localhost:${port}${handler.path}`));
