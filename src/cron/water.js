require("dotenv").config();

const tanam = require("../packages/tanam");
const logger = require("../utils/logger");

const token = process.env.SHOPEE_TOKEN;
const deviceId = process.env.SHOPEE_DEVICE_ID;
const STATES = ["Bibit", "Pohon", "Berbuah"];

const PROFILE = {
  name: "ghufr",
  userId: 95544610,
};

const FROMHELP = [
  {
    name: "ghufronfr",
    userId: 104047426,
    token: process.env.SHOPEE_TOKEN_FRIEND_1,
    deviceId,
  },
];

const TOHELP = [47449961, 104047426];

const display = ({ state, exp, name, totExp }) => {
  let st = "Panen";
  if (state < 4) {
    st = `${STATES[state - 1]} (${state})`;
  }

  console.log("====================");
  console.log(`Name     : ${name}`);
  console.log(`State    : ${st}`);
  console.log(`Curr Exp : ${exp}`);
  console.log(`Tot. Exp : ${totExp}`);
  console.log("====================");
};

(async () => {
  try {
    const myCrop = await tanam.getMyCrop({ token });

    // TODO: Add mechanism for refresh token

    if (myCrop.code === 0) {
      const currResource = myCrop.data.resources[0];
      const currCrop = myCrop.data.crops[0];

      // Check crop state
      if (currCrop.state === 100) {
        // Harvest crop
        const harvest = tanam.harvestCrop({
          token,
          deviceId,
          cropId: currCrop.id,
        });
        if (harvest.code === 0) {
          const reward =
            harvest.data.reward.rewardItems[0].itemExtraData
              .luckyDrawAwardValue;
          logger.log({ level: "info", message: `+ ${reward} koin` });
          console.log(`+ Anda mendapatkan ${reward} koin`);
        }
      }

      if (currCrop.state === 101) {
        // Get all available crop
        const crops = await tanam.getCrop({ token });
        const nCrop = crops.data.cropMetas[0];

        // Tanam crop
        const plant = await tanam.createCrop({ id: nCrop.id, token });

        if (plant.code === 0) {
          console.log(`+ Anda menanam ${nCrop.name}`);
        }
      }

      if (currResource.number > 0) {
        // Water crop
        const water = await tanam.waterCrop({
          token,
          cropId: currCrop.id,
          resourceId: currResource.id,
        });

        if (water.code === 0) {
          console.log(`+ Anda menyiram ${water.data.useNumber} air`);
        }
      }

      // const friend = FROMHELP[0];

      for (let i = 0; i < FROMHELP.length; i++) {
        const friend = FROMHELP[i];

        // get help from friend
        const helpFrom = await tanam.helpFriend({
          token: friend.token,
          deviceId: friend.deviceId,
          friendId: PROFILE.userId,
          cropId: currCrop.cropId,
        });
        if (helpFrom.code === 0) {
          console.log(help);
        }
      }

      // Help other friend

      for (let i = 0; i < TOHELP.length; i++) {
        const friendId = TOHELP[i];

        const friend = await tanam.getFriend({ friendId, token });
        if (!friend.code !== 0) {
          continue;
        }
        const friendCrop = friend.data.crops[0];

        const helpTo = await tanam.helpFriend({
          token,
          deviceId,
          friendId,
          cropId: friendCrop.id,
        });
        console.log(helpTo);
        const canSteal = await tanam.canSteal({
          token,
          friendId,
        });

        if (canSteal.data.canStealWater > 0) {
          const steal = await tanam.stealWater({
            token,
            friendId,
            friendName: friend.name,
            deviceId,
          });
          if (steal.code === 0 && steal.data.stealWaterNumber > 0) {
            console.log(
              `+ Anda mendapatkan ${steal.data.stealWaterNumber} koin`
            );
          }
        }
      }

      const myNewCrop = await tanam.getMyCrop({ token });
      if (myNewCrop.code === 0) {
        const currCrop = myNewCrop.data.crops[0];

        display({
          state: currCrop.state,
          exp: currCrop.exp,
          name: currCrop.meta.name,
          totExp: currCrop.meta.config.totalExp,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
