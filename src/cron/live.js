require("dotenv").config();
const fs = require("fs");
const FormData = require("form-data");

const live = require("../packages/live");
const logger = require("../utils/logger");

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

(async () => {
  try {
    const raw = fs.readFileSync("credentials.json");
    const credentials = JSON.parse(raw);

    for (let i = 0; i < credentials.length; i++) {
      const { token, deviceId, name } = credentials[i];

      const Ua = process.env.UA;
      const dt = new Date();
      const ts = dt.getTime();

      const options = {
        offset: 0,
        limit: 10,
        tab_type: 1,
        tab_id: 592037541125632,
        device_id: deviceId,
        ctx_id: `${deviceId}-${ts}-79`,
        token,
      };

      const streams = await live.getLivestreams(options);
      if (streams.err_code === 0 && streams.data.list.length > 0) {
        const paidStreams = streams.data.list.filter(
          (str) => str.item.coins_per_claim > 0
        );
        const stream = paidStreams[0];

        if (stream) {
          const claimStatus = await live.claimStatus({
            uid: stream.item.uid,
            token,
            sessId: stream.item_id,
          });

          const joinStream = await live.joinStream({
            sessId: stream.item_id,
            token,
            deviceId,
          });

          if (claimStatus.data.claim_times_left > 0) {
            await live.lockCoin({
              sessId: stream.item_id,
              uid: stream.item.uid,
              Ua,
              token,
            });
            const formData = new FormData();
            formData.append(
              "PLAY_EVT_PLAY_BEGIN",
              joinStream.data.session.play_url
            );
            formData.append(
              "JDfbN4Q7aHETNLOEnYJ6/nLFUu8v84hAEkD/pS3or5E",
              "* xiaomiRedmi Note 50:29B 26008J P Z IDb j 1.1.9p"
            );
            for (
              let j = 0;
              j < claimStatus.data.required_watch_time / 10;
              j++
            ) {
              await live.reportPB({
                token,
                data: formData,
              });
              await sleep(1000 * 10);
            }

            const cclaim = await live.canClaim({
              token,
              sessId: stream.item_id,
            });
            if (cclaim.err_code === 0) {
              const claim = await live.claimCoin({
                token,
                uid: stream.item.uid,
                sessId: stream.item_id,
              });
              if (claim.err_code === 0) {
                logger.info(
                  `${name} mendapakan ${claimStatus.data.coins_per_claim} koin`
                );
              }
            }
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
