const qs = require("querystring");
const WebSocket = require("ws");

const query = {
  uid: 95544610,
  session_id: 2974334,
  version: "v2",
  usersig: 3232,
  conn_ts: 232,
  last_msg_ts: 2302,
};
const ws = new WebSocket(
  `ws://live.shopee.co.id/im/v1/comet?${qs.stringify(query)}`
);
ws.on("open", function open() {
  ws.send("something");
});

ws.on("close", function close() {
  console.log("disconnected");
});

ws.on("message", function incoming(data) {
  console.log(data);
});
