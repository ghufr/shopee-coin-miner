const axios = require("axios");
const gameBaseUrl = "https://games.shopee.co.id";

// every 8AM
const claim = ({ eventId, token, requestId, appId, activityId }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .post(
      `${gameBaseUrl}/luckydraw/api/v1/lucky/event/${eventId}`,
      {
        request_id: requestId,
        app_id: appId,
        activity_code: activityId,
      },
      {
        headers: { Cookie: cookies.join(";") },
      }
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const chances = ({ token, chanceId, eventId, appId }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .get(
      `${gameBaseUrl}/gameplatform/api/v1/chance/${chanceId}/event/${eventId}/query?appid=${appId}`,
      {
        headers: { Cookie: cookies.join(";") },
      }
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const getActivity = ({ activityId, token }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .get(
      `${gameBaseUrl}/gameplatform/api/v1/game/activity/${activityId}/settings`,
      {
        headers: { Cookie: cookies.join(";") },
      }
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

module.exports = { claim, chances, getActivity };
