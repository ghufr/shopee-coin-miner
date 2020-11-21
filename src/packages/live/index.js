const axios = require("axios");
const qs = require("querystring");

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

const reportPB = ({ token, data }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .post(`${baseUrl}/dataapi/dataweb/event/reportPB`, null, {
      headers: {
        Cookie: cookies.join(";"),
        "Content-Type": "multipart/form-data",
      },
      body: data,
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const followStream = ({ token, uid }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .get(`${baseUrl}/api/v1/host/${uid}/follow`, {
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

const claimStatus = ({ token, uid, sessId }) => {
  const cookies = [`SPC_EC=${token}`];
  return axios
    .get(`${baseUrl}/api/v1/session/${sessId}/coin/user_config?uid=${uid}`, {
      headers: { Cookie: cookies.join(";") },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const lockCoin = ({ uid, sessId, token, userAgent }) => {
  const cookies = [`SPC_EC=${token}`, `UA=${userAgent}`];

  return axios
    .post(
      `${baseUrl}/api/v1/session/${sessId}/coin/lock`,
      { uid },
      {
        headers: { Cookie: cookies.join(";") },
      }
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const canClaim = ({ sessId, token, uid, shopeeToken }) => {
  const cookies = [`SPC_EC=${token}`, `shopee_token=${shopeeToken}`];

  return axios
    .post(
      `${baseUrl}/api/v1/session/${sessId}/coin/can_claim`,
      { uid },
      {
        headers: { Cookie: cookies.join(";") },
      }
    )
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

const connectWs = ({ sessId, uid, deviceId, userSig }) => {
  const query = {
    uid,
    session_id: sessId,
    version: "v2",
    device_id: deviceId,
    usersig: userSig,
    conn_ts: 1600141612959,
    last_msg_ts: 0,
  };

  return axios
    .get(`https://live.shopee.co.id/im/v1/comet?${qs.stringify(query)}`, {
      headers: {
        "Sec-WebSocket-Key": "F5DdpXHTC+R9n/XFPPTuyg==",
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
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
  lockCoin,
};
