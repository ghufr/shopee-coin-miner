const axios = require("axios");

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

/**
 * Responses
{
	"code": 0,
	"msg": "success",
	"data": {
		"@timestamp": "2020-08-19T12:47:16+08:00",
		"check_in_day": 1,
		"checkin_list": [
				5,
				10,
				15,
				20,
				25,
				30,
				150,
				5
		],
		"dataview_type": "checkin",
		"deviceid": "5018fe6fdd23878e_unknown",
		"devicetype": "PC",
		"increase_coins": 5,
		"increase_time": 1597812436,
		"ip_addr": "36.71.232.79",
		"logid": "eea21d1e-c095-49c4-8030-35ebdf54997f",
		"rule_id": 14,
		"success": false,
		"timestamp": 1597812436,
		"today_index": 1,
		"userid": "95544610",
		"username": "ghufr"
  }
}
 *
*/

module.exports = { checkin };
