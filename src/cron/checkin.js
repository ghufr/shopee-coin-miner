require("dotenv").config();

const coins = require("../packages/coins");
const account = require("../packages/account");
const logger = require("../utils/logger");

const fs = require("fs");

// const token = process.env.SHOPEE_TOKEN;

// 0 1 * * *
//  5, 10,  15, 20, 25, 30, 150 = 255/w = 1020/m

(async () => {
  try {
    const raw = fs.readFileSync("./credentials.json");
    const credentials = JSON.parse(raw);

    for (let i = 0; i < credentials.length; i++) {
      const { shopeeToken, name } = credentials[i];

      const Ua = "Shopee Android Beeshop locale/id version=376 appver=26008";
      const token = await account.refresh({
        shopeeToken,
        Ua,
      });

      const checkin = await coins.checkin({ token });

      // console.log(checkin);

      if (checkin.code === 0 && checkin.data.success) {
        logger.info(
          `+ ${name} mendapatkan ${checkin.data.increase_coins} koin`
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
