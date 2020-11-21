const axios = require("axios");
const qs = require("qs");
const baseUrl = require("../../config");

const getOrders = ({ limit, offset, order_type }) => {
  const query = {
    limit,
    offset,
    order_type,
  };

  const url = `${baseUrl.mall}/api/v1/orders?${qs.stringify(query)}`;
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

module.exports = { getOrders };
