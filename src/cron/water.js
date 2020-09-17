const tanam = require("../packages/tanam");
const logger = require("../utils/logger");

const fs = require("fs");

const STATES = ["Bibit", "Pohon", "Berbuah"];

const addFriends = [
  { name: "sucinuriyah", userId: 47449961, help: true },
  { name: "siscadewijs23", userId: 150344844, help: true },
  { name: "ryansupriadi17", userId: 121967668, help: true },
  { name: "ezrachrismyralda", userId: 34862991, help: true },

  { name: "emilparts", userId: 14264625, help: false },
  { name: "handayanioktavia", userId: 35811381, help: false },
  { name: "inez.sg", userId: 54071695, help: false },
  { name: "kiranadhiatama", userId: 3106582, help: false },
  { name: "nabilazaira", userId: 59229412, help: false },
  { name: "sabilaa.ch", userId: 30275678, help: false },
  { name: "rizkyrhakiki", userId: 6950172, help: false },
  { name: "ifanfatkhurochman", userId: 5838156, help: false },
  { name: "galihputrawijaya", userId: 104047426, help: false },
  { name: "nurafida12345", userId: 215721804, help: false },
  { name: "zenkeyko", userId: 171082687, help: false },
  { name: "winspack99", userId: 285404831, help: false },
  { name: "mhmmdanggy", userId: 209098546, help: false },
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
  console.log("====================\n");
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
          // console.log(friend.name);

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
              logger.info(`${reward} koin`);
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
    console.log(err);
  }
})();
