const axios = require("axios");
const baseUrl = "https://luckydraw.shopee.co.id";

// every 8AM
const claim = ({ id, token }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .post(`${baseUrl}/api/v1/luckydraw/${id}/`, null, {
      headers: { Cookie: cookies.join(";") },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

module.exports = { claim };
