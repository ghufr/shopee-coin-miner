require("dotenv").config();

const live = require("../packages/live");

const token = process.env.SHOPEE_TOKEN;
const deviceId = process.env.SHOPEE_DEVICE_ID;

(async () => {
  try {
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

    // const claim = await live.canClaim({ uid: 2981804, token });

    // const claim = await live.claimCoin({ uid: 2981804, token });
    // console.log(claim);
    const streams = await live.getLivestreams(options);
    if (streams.err_code === 0 && streams.data.list.length > 0) {
      let max = 0;
      let stream = null;

      const paidStreams = streams.data.list.filter((str) => {
        const bonus = str.item.coins_per_claim;
        if (bonus > 0) {
          if (bonus > max) {
            max = bonus;
            stream = str;
          }
          return true;
        }
      });
      console.log(`Terdapat ${paidStreams.length} stream yang memberikan koin`);
      if (stream) {
        const hostId = stream.item.uid;
        const sessId = stream.item_id;
        const roomId = stream.item.room_id;
        const shopId = stream.item.shop_id;

        // const follow = await live.followStream({ sessId, token });
        // if (follow.err_code !== 0) {
        //   throw Error(follow.err_msg);
        // }

        const join = await live.joinStream({ sessId, token, deviceId });

        if (join.err_code !== 0) {
          throw Error(join.err_msg);
        }
        const chatroomId = join.data.session.chatroom_id;
        const usersig = join.data.usersig;

        // const chatroom = await live.getChatroom({ token });
        // const reportPB = await live.reportPB();
        // console.log(reportPB);
        // TODO: Connect using webscoket
        const claimStatus = await live.claimStatus({ token, sessId });
        // if (
        //   claimStatus.err_code !== 0 ||
        //   claimStatus.data.can_claim === 0 ||
        //   claim_times_left === 0
        // ) {
        //   throw Error("Tidak bisa mengklaim koin");
        // }
        const claimCoin = await live.claimCoin({ uid: hostId, sessId, token });
        if (claimCoin.err_code !== 0) {
          throw Error(claimCoin.err_msg);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
