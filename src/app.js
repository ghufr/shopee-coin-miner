require("dotenv").config();
const coins = require("./packages/coins");
const feeds = require("./packages/feeds");

async function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

const token = process.env.SHOPEE_TOKEN;

(async () => {
  try {
    // const checkin = await coins.checkin({ token });
    // console.log(checkin);

    const timeline = await feeds.getTimeline({
      token,
      userId: 1290517,
      limit: 20,
    });

    // console.log(timeline.data.list);

    timeline.data.list.map((item) => {
      console.log(item.feed_id, item.content.caption);
      console.log();
    });

    // TODO: Filter post
    const hashtags = ["Giveaway", "Hadiah"];

    // const rewardedPost = timeline.filter((post) => post.)

    // const commentList = [
    //   "Apple Watch donggg 😍",
    //   "Apple Watchnya kakak",
    //   "Kok gaada yang pilih Apple Watch yahh :(",
    //   "Apple Watch + Iphone :)",
    //   "Apple Watch jamnya anak gauls",
    //   "Kayaknya bagus sihh iPhone",
    //   "Wahh kalo saya bisa dapet iPhone atau Apple Watch sihh beruntung parah",
    // ];

    const commentList = [
      "A dong jawabannya masa sihh ada yg jawab B :(",
      // "Bagus sihh yg lipet bawah, tapi yg lipet samping lebih keren",
      // "Yg lipet samping juga boleh kok :)",
      // "Yg B dong, the OG",
      // "Kok orang-orang pada milih yg A padahal yg B aja udh cukup :(",
    ];

    const targetPost = [
      {
        id: "ABh2UMicAwAVsRMAAAAAAA==",
        comments: [],
      },
    ];

    const delay = Math.floor(Math.random() * 3);
    let stop = false;
    while (!stop) {
      for (let i = 0; i < 2; i++) {
        const element = commentList[i];
        const comment = await feeds.commentPost({
          token,
          feedId: "",
          comment: element,
        });
        if (comment.code !== 0) {
          stop = true;
          console.log(comment.code);
          break;
        }
        await sleep(delay * 1000);
      }
      await sleep(delay * 100);
    }

    // console.log(comment);
  } catch (err) {
    console.log(err);
  }
})();
