const axios = require("axios");
const baseUrl = "https://games.shopee.co.id";

// 3m * 50 =
const waterCrop = ({ token, cropId, resourceId }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .post(
      `${baseUrl}/farm/api/orchard/crop/water`,
      {
        cropId,
        resourceId,
      },
      { headers: { Cookie: cookies.join(";") } }
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const getCrop = ({ token }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .get(`${baseUrl}/farm/api/orchard/crop/meta/get`, {
      headers: { Cookie: cookies.join(";") },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const createCrop = ({ id, token }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .post(
      `${baseUrl}/farm/api/orchard/crop/create`,
      { metaId: id },
      {
        headers: { Cookie: cookies.join(";") },
      }
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const getMyCrop = ({ token }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .get(`${baseUrl}/farm/api/orchard/context/get`, {
      headers: { Cookie: cookies.join(";") },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const getMyResource = ({ token }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .get(`${baseUrl}/farm/api/orchard/resource/get`, {
      headers: { Cookie: cookies.join(";") },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const harvestCrop = ({ token, deviceId, cropId }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .post(
      `${baseUrl}/farm/api/orchard/crop/harvest`,
      { deviceId, cropId },
      {
        headers: { Cookie: cookies.join(";") },
      }
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const helpFriend = ({
  token,
  friendId,
  deviceId,
  friendName,
  cropId,
  channel = "copyLink",
}) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .post(
      `${baseUrl}/farm/api/friend/help`,
      { friendId, cropId, deviceId, friendName, channel },
      {
        headers: { Cookie: cookies.join(";") },
      }
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const stealWater = ({ token, friendId, friendName, deviceId }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .post(
      `${baseUrl}/farm/api/friend/steal_water`,
      {
        friendId,
        friendName,
        deviceId,
      },
      {
        headers: { Cookie: cookies.join(";") },
      }
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const canSteal = ({ friendId, token }) => {
  const cookies = [`SPC_EC=${token}`];
  const query = `friendId=${friendId}`;

  return axios
    .get(`${baseUrl}/farm/api/friend/collection_countdown?${query}`, {
      headers: { Cookie: cookies.join(";") },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const canHelp = ({ token }) => {
  const cookies = [`SPC_EC=${token}`];
};

const getFriend = ({ friendId, token }) => {
  const query = `friendId=${friendId}`;
  const cookies = [`SPC_EC=${token}`];

  return axios
    .get(`${baseUrl}/farm/api/friend/orchard/context/get?${query}`, {
      headers: { Cookie: cookies.join(";") },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

module.exports = {
  waterCrop,
  getCrop,
  createCrop,
  getMyCrop,
  harvestCrop,
  getMyResource,
  helpFriend,
  stealWater,
  canSteal,
  canHelp,
  getFriend,
};

/**
 * {
  code: 0,
  msg: 'success',
  data: {
    crop: {
      id: 10796224,
      userId: 95544610,
      metaId: 156,
      exp: 0,
      state: 100,
      lifeStatus: 0,
      rewardId: 0,
      createTime: 1596384275256,
      modifyTime: 1597981603091,
      deadTime: 0,
      selfWaterTime: 1597981603091,
      meta: [Object],
      harvestTime: 0
    },
    resource: {
      id: 28116740,
      metaId: 1,
      number: 3,
      lastAutoWaterTime: 0,
      resumeLeftSeconds: 10150,
      meta: [Object],
      isFirst: false
    },
    rewards: [],
    useNumber: 47
  }
}

 */
