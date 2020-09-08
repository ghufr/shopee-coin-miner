const axios = require("axios");
const Cookie = require("cookie");

const mallBaseUrl = "https://mall.shopee.co.id";

const refresh = ({ shopeeToken, Ua }) => {
  const cookies = [`UA=${Ua}`, `shopee_token=${shopeeToken}`];

  return axios
    .get(`${mallBaseUrl}/api/v4/client/refresh`, {
      headers: { cookie: cookies.join(";") },
    })
    .then((res) => res.headers["set-cookie"][0])
    .then((cookie) => Cookie.parse(cookie).SPC_EC)
    .catch((err) => err.response.data);
};

module.exports = { refresh };
