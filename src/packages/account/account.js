const axios = require("axios");
const Cookie = require("cookie");
const { baseUrl } = require("../../config");
const { cookies } = require("../../utils");

const refresh = ({ shopeeToken, userAgent }) => {
  const cookie = {
    UA: userAgent,
    shopee_token: shopeeToken,
  };

  const url = `${baseUrl.mall}/api/v4/client/refresh`;

  return axios
    .get(url, {
      headers: { cookie: cookies.encode(cookie) },
    })
    .then((res) => res.headers)
    .catch((err) => err.response.data);
};

const getUserInfo = () => {};

const getFeatureToggles = ({ userId, userAgent, shopeeToken }) => {
  const cookie = {
    UA: userAgent,
    shopee_token: shopeeToken,
  };

  const params = {
    userid: userId,
  };

  const url = `${baseUrl.mall}/api/v2/get_feature_toggles`;

  return axios
    .get(url, {
      headers: { cookie: cookies.encode(cookie) },
      params,
    })
    .then((res) => res.headers["set-cookie"][1])
    .then((cookie) => Cookie.parse(cookie).SPC_EC)
    .catch((err) => err.response);
};

const loginStatus = ({ userAgent, shopeeToken }) => {
  const cookie = {
    UA: userAgent,
    shopee_token: shopeeToken,
  };

  const url = `${baseUrl.main}/api/v2/user/login_status`;

  return axios.get(url, {
    headers: { cookie: cookies.encode(cookie) },
  });
};

module.exports = { refresh, loginStatus, getFeatureToggles, getUserInfo };
