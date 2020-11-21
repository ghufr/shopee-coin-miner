const tanam = require("../packages/tanam");
const logger = require("../utils/logger");

const fs = require("fs").promises;

const STATES = ["Bibit", "Pohon", "Berbuah"];

const display = ({ state, exp, name, totExp }) => {
  let st = "Panen";
  if (state < 4) {
    st = `${STATES[state - 1]} (${state})`;
  }

  console.table({ Name: name, State: st, "Curr Exp": exp, "Tot. Exp": totExp });
};

(async () => {
  try {
    const rawc = await fs.readFile("./credentials.json");
    const credentials = JSON.parse(rawc || []);

    const rawf = await fs.readFile("./friends.json");
    const addFriends = JSON.parse(rawf || []);

    for (let i = 0; i < credentials.length; i++) {
      const { token, deviceId, name } = credentials[i];
      const friends = [...credentials, ...addFriends];
      friends.splice(i, 1);

      const myCrop = await tanam.getMyCrop({ token });

      if (myCrop.code === 0) {
        const currResource = myCrop.data.resources[0];
        const currCrop = myCrop.data.crops[0];

        if (currResource.number > 0) {
          // Water crop
          const water = await tanam.waterCrop({
            token,
            cropId: currCrop.id,
            resourceId: currResource.id,
          });

          if (water.code === 0) {
            logger.info(`${name} menyiram ${water.data.useNumber} air`);
          }
        }

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

          if (friend.help) {
            const helpTo = await tanam.helpFriend({
              token,
              deviceId,
              friendId: friend.userId,
              cropId: friendCrop.id,
            });
            if (helpTo.code === 0) {
              logger.info(`${name} membantu ${friendProfile.data.user.name}`);
            }
          }
          // Now you can't steal water from friend :(
          //   const canSteal = await tanam.canSteal({
          //     token,
          //     friendId: friend.userId,
          //   });

          //   if (canSteal.data.canStealWater > 0) {
          //     const steal = await tanam.stealWater({
          //       token,
          //       friendId: friend.userId,
          //       friendName: friend.name,
          //       deviceId,
          //     });
          //     if (steal.code === 0 && steal.data.stealWaterNumber > 0) {
          //       logger.info(
          //         `${name} mendapatkan ${steal.data.stealWaterNumber} air dari ${friendProfile.data.user.name}`
          //       );
          //     }
          //   }
        }

        const myNewCrop = await tanam.getMyCrop({ token });
        if (myNewCrop.code === 0) {
          const currCrop = myNewCrop.data.crops[0];

          // Check crop state
          if (currCrop.state === 100) {
            // Harvest crop
            const harvest = await tanam.harvestCrop({
              token,
              deviceId,
              cropId: currCrop.id,
            });
            if (harvest.code === 0) {
              const reward =
                harvest.data.reward.rewardItems[0].itemExtraData
                  .luckyDrawAwardValue;
              logger.info(`${name} mendapatkan ${reward} koin`);
            }
            // Get all available crop
            const crops = await tanam.getCrop({ token });
            const nCrop = crops.data.cropMetas[0];

            // Tanam crop
            const plant = await tanam.createCrop({ id: nCrop.id, token });

            if (plant.code === 0) {
              logger.info(`${name} menanam ${nCrop.name}`);
            }
          }

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
    logger.error(err);
  }
})();
