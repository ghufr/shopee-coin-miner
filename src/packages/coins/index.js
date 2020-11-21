const axios = require("axios");
const { userAgent } = require("../../config");

const checkin = ({ token }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios({
    method: "POST",
    url: "https://shopee.co.id/mkt/coins/api/v2/checkin",
    headers: {
      Cookie: cookies.join(";"),
    },
  })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const getUserCoins = ({ token, userAgent }) => {
  const cookies = [`SPC_EC=${token}`, `UA=${userAgent}`];

  return axios
    .get(`https://mall.shopee.co.id/api/v2/coin/get_user_coins`, {
      headers: {
        Cookie: cookies.join(";"),
      },
    })
    .then((res) => res.data.data)
    .then((data) => data.available_amount)
    .catch((err) => err.response.data);
};

module.exports = { checkin, getUserCoins };
