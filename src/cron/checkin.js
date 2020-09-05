require("dotenv").config();

const coins = require("../packages/coins");

const token = process.env.SHOPEE_TOKEN;

// Every 00:00 am
(async () => {
  try {
    const checkin = await coins.checkin({ token });
    console.log(checkin);
    if (checkin.code === 0 && checkin.data.success) {
      console.log(checkin);
      console.log(
        `Selamat anda mendapatkan ${checkin.data.increase_coins} koin`
      );
    }
  } catch (err) {
    console.log(err);
  }
})();
