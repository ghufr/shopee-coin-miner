const qs = require("qs");
const axios = require("axios");
const Cookie = require("cookie");
const { baseUrl } = require("../../config");

const refresh = ({ shopeeToken, userAgent }) => {
  const cookies = [`UA=${userAgent}`, `shopee_token=${shopeeToken}`];

  const url = `${baseUrl.mall}/api/v4/client/refresh`;
  return axios
    .get(url, {
      headers: { cookie: cookies.join(";") },
    })
    .then((res) => {
      return res.headers;
    })
    .catch((err) => err.response.data);
};

const getUserInfo = () => {};

const getFeatureToggles = ({ userId, userAgent, shopeeToken }) => {
  const cookies = [`UA=${userAgent}`, `shopee_token=${shopeeToken}`];
  const query = {
    userid: userId,
  };
  const url = `${baseUrl.mall}/api/v2/get_feature_toggles?${qs.stringify(
    query
  )}`;
  return axios
    .get(url, {
      headers: { cookie: cookies.join(";") },
    })
    .then((res) => {
      return res.headers["set-cookie"][1];
    })
    .then((cookie) => Cookie.parse(cookie).SPC_EC)
    .catch((err) => err.response);
};

const loginStatus = ({ userAgent, shopeeToken }) => {
  const cookies = [`UA=${userAgent}`, `shopee_token=${shopeeToken}`];

  return axios.get(`${baseUrl.main}/api/v2/user/login_status`, {
    headers: { cookie: cookies.join(";") },
  });
};

module.exports = { refresh, loginStatus, getFeatureToggles, getUserInfo };
