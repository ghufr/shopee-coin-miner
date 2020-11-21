const axios = require("axios");
const { baseUrl } = require("../../config");

const waterCrop = ({ token, cropId, resourceId }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .post(
      `${baseUrl.games}/farm/api/orchard/crop/water`,
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
    .get(`${baseUrl.games}/farm/api/orchard/crop/meta/get`, {
      headers: { Cookie: cookies.join(";") },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const createCrop = ({ id, token }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .post(
      `${baseUrl.games}/farm/api/orchard/crop/create`,
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
    .get(`${baseUrl.games}/farm/api/orchard/context/get`, {
      headers: { Cookie: cookies.join(";") },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const getMyResource = ({ token }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .get(`${baseUrl.games}/farm/api/orchard/resource/get`, {
      headers: { Cookie: cookies.join(";") },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const harvestCrop = ({ token, deviceId, cropId }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .post(
      `${baseUrl.games}/farm/api/orchard/crop/harvest`,
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
      `${baseUrl.games}/farm/api/friend/help`,
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
      `${baseUrl.games}/farm/api/friend/steal_water`,
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
    .get(`${baseUrl.games}/farm/api/friend/collection_countdown?${query}`, {
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
    .get(`${baseUrl.games}/farm/api/friend/orchard/context/get?${query}`, {
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
