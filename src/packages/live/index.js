const axios = require("axios");
const qs = require("querystring");
const WebSocket = require("ws");

const baseUrl = "https://live.shopee.co.id";

const getLivestreams = ({ token, ...query }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .get(`${baseUrl}/api/v1/lptab/item?${qs.stringify(query)}`, {
      headers: { Cookie: cookies.join(";") },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const reportPB = () => {
  return axios
    .post(`${baseUrl}/dataapi/dataweb/event/reportPB`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const followStream = ({ token, sessId }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .get(`${baseUrl}/api/v1/host/${sessId}/follow`, {
      headers: { Cookie: cookies.join(";") },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const getChatroom = ({ token }) => {
  const cookies = [`SPC_EC=${token}`];
  const dt = new Date();

  // console.log(dt.getTime().toString().slice(0, 9));

  const query = {
    uuid: "",
    timestamp: dt.getTime().toString().slice(0, 9),
    version: "v2",
  };
  const id = "SPIM-5CE3994A33AE";
  return axios
    .get(
      `https://chatroom-live.shopee.co.id/api/v1/fetch/chatroom/${id}/message?${qs.stringify(
        query
      )}`,
      { headers: { Cookie: cookies.join(";") } }
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const claimCoin = ({ token, uid, sessId }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .post(
      `${baseUrl}/api/v1/session/${sessId}/coin/claim`,
      { uid },
      {
        headers: { Cookie: cookies.join(";") },
      }
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const claimStatus = ({ token, sessId }) => {
  const cookies = [`SPC_EC=${token}`];
  return axios
    .get(`${baseUrl}/api/v1/session/${sessId}/coin/user_config?uid=36197781`, {
      headers: { Cookie: cookies.join(";") },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const canClaim = ({ uid, token }) => {
  return axios
    .post(`${baseUrl}/api/v1/session/${uid}/coin/can_claim`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const joinStream = ({ sessId, token, deviceId }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .post(
      `${baseUrl}/api/v1/session/${sessId}/join`,
      {
        avatar: "",
        uuid: deviceId,
        ver: 1,
      },
      { headers: { Cookie: cookies.join(";") } }
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const exitStream = ({ sessId }) => {
  return axios
    .post(`${baseUrl}/api/v1/session/${sessId}/exit`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const connectWs = () => {
  const query = {
    uid: 95544610,
    session_id: 2974334,
    version: "v2",
  };
  const ws = new WebSocket(
    `ws://live.shopee.co.id/im/v1/comet?${qs.stringify(query)}`
  );
  ws.on("open", function open() {
    ws.send("something");
  });

  ws.on("message", function incoming(data) {
    console.log(data);
  });
};

module.exports = {
  getLivestreams,
  reportPB,
  followStream,
  getChatroom,
  claimCoin,
  claimStatus,
  connectWs,
  canClaim,
  exitStream,
  joinStream,
};
