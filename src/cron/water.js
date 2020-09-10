require("dotenv").config();

const tanam = require("../packages/tanam");
const logger = require("../utils/logger");

const fs = require("fs");
const { add } = require("winston");

const STATES = ["Bibit", "Pohon", "Berbuah"];

const addFriends = [
  { name: "sucinuriyah", userId: 47449961 },
  { name: "zenkeyko", userId: 171082687 },
];

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
    const raw = fs.readFileSync("./credentials.json");
    const credentials = JSON.parse(raw);

    for (let i = 0; i < credentials.length; i++) {
      const { token, deviceId, name } = credentials[i];
      const friends = [...credentials, ...addFriends];
      friends.splice(i, 1);

      // console.log(name);

      const myCrop = await tanam.getMyCrop({ token });

      // TODO: CHECK LOGIN STATUS

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

        // for (let j = 0; j < friends.length; i++) {
        //   const friend = friends[j];

        //   // get help from friend
        //   const helpFrom = await tanam.helpFriend({
        //     token: cred.token,
        //     deviceId: cred.deviceId,
        //     friendId: friend.userId,
        //     cropId: currCrop.id,
        //   });

        //   if (helpFrom.code === 0) {
        //     console.log(`+ Mendapatkan bantuan dari ${friend.name}`);
        //   }
        // }

        // Help other friend

        for (let j = 0; j < friends.length; j++) {
          const friend = friends[j];

          const friendProfile = await tanam.getFriend({
            friendId: friend.userId,
            token,
          });
          if (friendProfile.code !== 0) {
            continue;
          }
          const friendCrop = friendProfile.data.crops[0];

          const helpTo = await tanam.helpFriend({
            token,
            deviceId,
            friendId: friend.userId,
            cropId: friendCrop.id,
          });
          if (helpTo.code === 0) {
            console.log(`help ${friendProfile.data.user.name}`);
          }
          const canSteal = await tanam.canSteal({
            token,
            friendId: friend.userId,
          });

          if (canSteal.data.canStealWater > 0) {
            const steal = await tanam.stealWater({
              token,
              friendId: friend.userId,
              friendName: friend.name,
              deviceId,
            });
            if (steal.code === 0 && steal.data.stealWaterNumber > 0) {
              console.log(
                `+ Anda mendapatkan ${steal.data.stealWaterNumber} air dari ${friendProfile.data.user.name}`
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
    }
  } catch (err) {
    console.log(err);
  }
})();
