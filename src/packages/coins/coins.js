const axios = require("axios");
const { cookies } = require("../../utils");

const checkin = ({ token }) => {
  const cookie = {
    SPC_EC: token,
  };

  const url = "https://shopee.co.id/mkt/coins/api/v2/checkin";

  return axios
    .post(url, {
      headers: {
        cookie: cookies.encode(cookie),
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const getUserCoins = ({ token, userAgent }) => {
  const cookie = {
    SPC_EC: token,
    UA: userAgent,
  };

  const url = "https://mall.shopee.co.id/api/v2/coin/get_user_coins";

  return axios
    .get(url, {
      headers: {
        Cookie: cookies.encode(cookie),
      },
    })
    .then((res) => res.data.data)
    .then((data) => data.available_amount)
    .catch((err) => err.response.data);
};

module.exports = { checkin, getUserCoins };
