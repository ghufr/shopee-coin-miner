require("dotenv").config();

const luckydraw = require("../packages/luckydraw");
const account = require("../packages/account");
const logger = require("../utils/logger");

const fs = require("fs");

// 0 9 * * *
(async () => {
  try {
    const raw = fs.readFileSync("./credentials.json");
    const credentials = JSON.parse(raw);

    for (let i = 0; i < credentials.length; i++) {
      const { shopeeToken, name } = credentials[i];
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
          logger.info(
            `+ ${name} mendapatkan ${prize.award.award_value_float} koin`
          );
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
