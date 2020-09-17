const fs = require("fs");
const boardgame = require("../packages/boardgame");
const account = require("../packages/account");

const logger = require("../utils/logger");

(async () => {
  try {
    const raw = fs.readFileSync("credentials.json");
    const credentials = JSON.parse(raw);
    const Ua = "Shopee Android Beeshop locale/id version=378 appver=26011";
    const rollId = 10958;
    const eventId = "37e5615c7e1e02e3";

    for (let i = 0; i < credentials.length; i++) {
      const { userId, deviceId, shopeeToken, name } = credentials[i];
      const token = await account.refresh({ shopeeToken, Ua });

      const rollStatus = await boardgame.rollStatus({
        token,
        rollId,
        eventId,
        Ua,
        userId,
        deviceId,
      });

      if (rollStatus.data && rollStatus.data.token.remaining > 0) {
        const roll = await boardgame.roll({
          eventId: "37e5615c7e1e02e3",
          rollId: 10958,
          token,
          userId,
          deviceId,
          shopeeToken,
        });
        // console.log(roll);
        if (roll.data.step_action === "PLUS_POINT") {
          logger.info(
            `${name} mendapatkan ${roll.data.step_info.point_earned} Poin`
          );
        }
      }
    }
  } catch (err) {
    logger.error(err.toString());
  }
})();