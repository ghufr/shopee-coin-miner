const axios = require("axios");
const { baseUrl } = require("../../config");

const getTimeline = ({ userId, limit }) => {
  // const cookies = [`SPC_EC=${token}`];

  return axios
    .get(
      `${baseUrl.feeds}/api/proxy/timeline/user?limit=${limit}&user_id=${userId}`
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

const likePost = () => {
  return axios({
    method: "POST",
    baseUrl: baseUrl.feeds,
    url: "/api/proxy/like",
    headers: {
      Cookie: "",
    },
  });
};

const commentPost = ({ token, feedId, comment }) => {
  const cookies = [`SPC_EC=${token}`];

  return axios
    .post(
      `${baseUrl.feeds}/api/proxy/comment`,
      {
        feed_id: feedId,
        comment,
        mentions: [],
        hashtags: [],
      },
      {
        headers: {
          Cookie: cookies.join(";"),
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

module.exports = { getTimeline, likePost, commentPost };
