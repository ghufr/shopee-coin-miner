const fs = require("fs");
const { userAgent } = require("../config");
const coins = require("../packages/coins");
const account = require("../packages/account");
const logger = require("../utils/logger");

(async () => {
  try {
    const raw = fs.readFileSync("credentials.json");
    const credentials = JSON.parse(raw);

    let total = 0;

    const arr = [];

    for (let i = 0; i < credentials.length; i++) {
      const { name, shopeeToken, userId } = credentials[i];
      if (!shopeeToken) {
        continue;
      }
      const token = await account.getFeatureToggles({
        userId,
        shopeeToken,
        userAgent,
      });
      const userCoin = await coins.getUserCoins({ token, userAgent });
      total += userCoin;
      arr.push({ name, userCoin });
      // console.log(`${name} mempunyai ${userCoin} koin`);
    }

    console.table(arr, ["name", "userCoin"]);
    console.table({ Total: total });
  } catch (err) {
    console.log(err);
    logger.error(err);
  }
})();
