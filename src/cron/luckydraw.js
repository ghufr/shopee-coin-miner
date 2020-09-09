require("dotenv").config();

const luckydraw = require("../packages/luckydraw");
const account = require("../packages/account");
const logger = require("../utils/logger");

const shopeeToken = process.env.SHOPEE_TOKEN_COOKIE;

// 0 9 * * *
(async () => {
  try {
    const Ua = "Shopee Android Beeshop locale/id version=376 appver=26008";
    const token = await account.refresh({ shopeeToken, Ua });

    // Cek token
    const chances = await luckydraw.chances({ token });
    if (chances.chance_count > 0) {
      // Claim hadiah
      const prize = await luckydraw.claim({
        token,
        id: "ff7d6916be64b8b4",
      });
      if (prize.award.award_value_float > 1) {
        logger.log({
          level: "info",
          message: `+ ${prize.award.award_value_float} koin`,
        });
        console.log(`+ Anda mendapatkan ${prize.award.award_value_float} koin`);
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
