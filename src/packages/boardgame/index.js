const axios = require("axios");

const baseUrl = "https://play.shopee.co.id";

const roll = ({ eventId, rollId, token, userId, deviceId, shopeeToken }) => {
  const cookies = [`SPC_EC=${token}`, `shopee_token=${shopeeToken}`];

  return axios
    .post(
      `${baseUrl}/api/boardgame-be/v1/events/${eventId}/roll/${rollId}`,
      {},
      {
        headers: {
          Cookie: cookies.join(";"),
          "x-tenant": "id",
          "x-user-id": userId,
          "x-device-id": deviceId,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const rollStatus = ({ eventId, rollId, Ua, userId, deviceId, token }) => {
  const cookies = [`SPC_EC=${token}`, `UA=${Ua}`];

  return axios
    .get(`${baseUrl}/api/boardgame-be/v1/events/${eventId}/state/${rollId}`, {
      headers: {
        Cookie: cookies.join(";"),
        "x-tenant": "id",
        "x-user-id": userId,
        "x-device-id": deviceId,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

module.exports = { roll, rollStatus };
