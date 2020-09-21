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
      const { shopeeToken, name, userId } = credentials[i];
      const Ua = process.env.UA;
      const token = await account.refresh({ shopeeToken, Ua });
      // Cek token
      const activityId = "2696a9e6224532e7";

      const activity = await luckydraw.getActivity({
        activityId,
        token,
      });

      const eventId = activity.data.basic.event_code;
      const chanceId = activity.data.modules[0].module_id;
      const appId = "E9VFyxwmtgjnCR8uhL";

      const requestId = `${userId}52057634`;

      const chances = await luckydraw.chances({
        token,
        eventId,
        chanceId,
        appId,
      });
      if (chances.code === 0 && chances.data.accumulate_chance > 0) {
        // Claim hadiah
        const claim = await luckydraw.claim({
          token,
          eventId,
          appId,
          activityId,
          requestId,
        });
        if (claim.data.prize.prize_type === 2) {
          logger.info(`${name} mendapatkan ${claim.data.package_name}`);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
