require("dotenv").config();

const luckydraw = require("../packages/luckydraw");

const token = process.env.SHOPEE_TOKEN;

(async () => {
  try {
    const prize = await luckydraw.claim({
      token,
      id: "ff7d6916be64b8b4",
    });
    console.log(prize);
    if (prize.code === 0) {
      // console.log(`Selamat anda mendapatkan ${water.increase_coins} koin`);
    }
  } catch (err) {
    console.log(err);
  }
})();
