require("dotenv").config();

const coins = require("../packages/coins");
const account = require("../packages/account");
const logger = require("../utils/logger");

// const token = process.env.SHOPEE_TOKEN;

// 0 1 * * *
//  5, 10,  15, 20, 25, 30, 150 = 255/w = 1020/m

const shopeeToken = process.env.SHOPEE_TOKEN_COOKIE;

(async () => {
  try {
    const Ua = "Shopee Android Beeshop locale/id version=376 appver=26008";
    const token = await account.refresh({ shopeeToken, Ua });

    const checkin = await coins.checkin({ token });

    if (checkin.code === 0 && checkin.data.success) {
      logger.log({
        level: "info",
        message: checkin.data.increase_coins + " koin",
      });
      console.log(`+ Anda mendapatkan ${checkin.data.increase_coins} koin`);
    }
  } catch (err) {
    console.log(err);
  }
})();
