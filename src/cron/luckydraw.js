const luckydraw = require("../packages/luckydraw");
const account = require("../packages/account");
const logger = require("../utils/logger");

const { userAgent } = require("../config");

const fs = require("fs");

// 0 9 * * *
(async () => {
  try {
    const raw = fs.readFileSync("./credentials.json");
    const credentials = JSON.parse(raw);

    for (let i = 0; i < credentials.length; i++) {
      const { shopeeToken, name, userId } = credentials[i];

      if (!shopeeToken) {
        continue;
      }

      // await account.refresh({ shopeeToken, userAgent });
      const token = await account.getFeatureToggles({
        userId,
        userAgent,
        shopeeToken,
      });
      // Cek token
      const activityId = await luckydraw.getDailyPrize();
      const appId = "E9VFyxwmtgjnCR8uhL";

      const activity = await luckydraw.getActivity({
        appId,
        activityId,
        token,
      });

      // const access = await luckydraw.access({ activityId, token });

      const eventId = activity.data.basic.event_code;
      const chanceId = activity.data.modules[0].module_id;

      const requestId = `${userId}52057634`;
      // console.log(requestId);
      // console.log(eventId);
      // console.log(activityId);

      const chances = await luckydraw.chances({
        token,
        eventId,
        chanceId,
        appId,
      });

      // console.log(chances);

      if (chances.data.daily_chance > 0) {
        // Claim hadiah
        const claim = await luckydraw.claim({
          token,
          eventId,
          appId,
          activityId,
          requestId,
        });
        if (claim.data && claim.data.prize_type === 2) {
          logger.info(`${name} mendapatkan ${claim.data.package_name}`);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
