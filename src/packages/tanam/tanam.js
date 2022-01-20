const axios = require("axios");
const { baseUrl } = require("../../config");
const { cookies } = require("../../utils");

const waterCrop = ({ token, cropId, resourceId }) => {
  const cookie = { SPC_EC: token };
  const url = `${baseUrl.games}/farm/api/orchard/crop/water`;
  const data = {
    cropId,
    resourceId,
  };

  return axios
    .post(url, data, { headers: { Cookie: cookies.encode(cookie) } })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const getCrop = ({ token }) => {
  const cookie = { SPC_EC: token };
  const url = `${baseUrl.games}/farm/api/orchard/crop/meta/get`;

  return axios
    .get(url, {
      headers: { Cookie: cookies.encode(cookie) },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const createCrop = ({ id, token }) => {
  const cookie = { SPC_EC: token };
  const url = `${baseUrl.games}/farm/api/orchard/crop/create`;
  const data = { metaId: id };

  return axios
    .post(url, data, {
      headers: { Cookie: cookies.encode(cookie) },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const getMyCrop = ({ token }) => {
  const cookie = { SPC_EC: token };
  const url = `${baseUrl.games}/farm/api/orchard/context/get`;

  return axios
    .get(url, {
      headers: { Cookie: cookies.encode(cookie) },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const getMyResource = ({ token }) => {
  const cookie = { SPC_EC: token };
  const url = `${baseUrl.games}/farm/api/orchard/resource/get`;

  return axios
    .get(url, {
      headers: { Cookie: cookies.encode(cookie) },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const harvestCrop = ({ token, deviceId, cropId }) => {
  const cookie = { SPC_EC: token };

  const url = `${baseUrl.games}/farm/api/orchard/crop/harvest`;

  const data = { deviceId, cropId };

  return axios
    .post(url, data, {
      headers: { Cookie: cookies.encode(cookie) },
    })
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
  const cookie = { SPC_EC: token };
  const url = `${baseUrl.games}/farm/api/friend/help`;
  const data = { friendId, cropId, deviceId, friendName, channel };

  return axios
    .post(url, data, {
      headers: { Cookie: cookies.encode(cookie) },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const stealWater = ({ token, friendId, friendName, deviceId }) => {
  const cookie = { SPC_EC: token };

  const url = `${baseUrl.games}/farm/api/friend/steal_water`;
  const data = {
    friendId,
    friendName,
    deviceId,
  };

  return axios
    .post(url, data, {
      headers: { Cookie: cookies.encode(cookie) },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const canSteal = ({ friendId, token }) => {
  const cookie = { SPC_EC: token };

  const params = { friendId };

  const url = `${baseUrl.games}/farm/api/friend/collection_countdown`;

  return axios
    .get(url, {
      params,
      headers: { Cookie: cookies.encode(cookie) },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

// eslint-disable-next-line no-unused-vars
const canHelp = ({ token }) => {
  // const cookies = [`SPC_EC=${token}`];
};

const getFriend = ({ friendId, token }) => {
  const cookie = { SPC_EC: token };
  const params = { friendId };

  const url = `${baseUrl.games}/farm/api/friend/orchard/context/get`;

  return axios
    .get(url, {
      params,
      headers: { Cookie: cookies.encode(cookie) },
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
