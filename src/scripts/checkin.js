const coins = require("../packages/coins");
const account = require("../packages/account");
const logger = require("../utils/logger");
const { userAgent } = require("../config");

const fs = require("fs");

//  5, 10,  15, 20, 25, 30, 150 = 255/w = 1020/m

(async () => {
  try {
    const raw = fs.readFileSync("./credentials.json");
    const credentials = JSON.parse(raw);

    for (let i = 0; i < credentials.length; i++) {
      const { shopeeToken, name, userId } = credentials[i];

      const token = await account.getFeatureToggles({
        shopeeToken,
        userAgent,
        userId,
      });

      const checkin = await coins.checkin({ token });

      if (checkin.code === 0 && checkin.data.success) {
        logger.info(`${name} mendapatkan ${checkin.data.increase_coins} koin`);
      }
    }
  } catch (err) {
    logger.error(err);
  }
})();
