require("dotenv").config();

const tanam = require("../packages/tanam");

const token = process.env.SHOPEE_TOKEN;
const deviceId = process.env.SHOPEE_DEVICE_ID;
const STATES = ["Bibit", "Pohon", "Berbuah"];

const display = ({ state, exp }) => {
  let st = "Panen";
  if (state < 4) {
    st = `${STATES[state - 1]} (${state})`;
  }

  console.log("====================");
  console.log(`State: ${st}`);
  console.log(`Exp: ${exp}`);
  console.log("====================");
};

(async () => {
  try {
    const myCrop = await tanam.getMyCrop({ token });

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
          console.log(
            `Anda mendapatkan ${harvest.data.reward.rewardItems[0].itemExtraData.luckyDrawAwardValue} koin`
          );
        }
      }

      if (currCrop.state === 101) {
        // Get all available crop
        const crops = await tanam.getCrop({ token });
        const nCrop = crops.data.cropMetas[0];

        // Tanam crop
        const plant = await tanam.createCrop({ id: nCrop.id, token });

        if (plant.code === 0) {
          console.log(`Anda menanam: ${nCrop.name}`);
        }
      }

      // console.log(currResource.number);

      if (currResource.number > 0) {
        // Water crop
        const water = await tanam.waterCrop({
          token,
          cropId: currCrop.id,
          resourceId: currResource.id,
        });

        if (water.code === 0) {
          console.log(
            `Anda menggunakan ${water.data.useNumber} air untuk menyiram ${currCrop.meta.name}`
          );
        }
      }
      const myNewCrop = await tanam.getMyCrop({ token });
      if (myNewCrop.code === 0) {
        const currCrop = myNewCrop.data.crops[0];

        display({ state: currCrop.state, exp: currCrop.exp });
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
