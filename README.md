# Shopee Coin Miner

Simple node.js script to automate shopee coin mining (🇮🇩)

## ⚠️ Disclaimer

Using this script violate Shopee Terms of Service, do at your own risk!

## 🛠️ Features

| Feature          | Status | Note                                              |
| ---------------- | ------ | ------------------------------------------------- |
| Shopee Tanam     | ✅     | self watering, harvesting, planting, help friends |
| Shopee Check In  | ✅     |
| Shopee Live      | ✅     |
| Lucky Draw       | ❌     |
| Poly (Boardgame) | ❌     |
| Goyang Pohon     | ❌     |
| Shopee Capit     | ❌     |
| Shopee review    | ❌     |

## How to use

### Requirements

- node.js >= 10
- Rooted Android phone (emulator / smartphone) (used only once)

### Setup

- Create `credentials.json` : Store all credentials data about users

  ```json
  [
    {
      "name": "shopee username",
      "token": "SPC_EC token",
      "shopeeToken": "shopee_token",
      "deviceId": "unique identifier",
      "userId": 123, // shopee userId
      "help": true // Help others
    }
    // Another users
  ]
  ```

  To find `shopeeToken` and `token` you can use `HTTPCanary` to capture shopee app data using rooted android device. Here's some quick steps:

  - Install HTTPCanary
  - Enable capture in HTTPCanary
  - Open Shopee app
  - Login using your account
  - Open HTTPCanary
  - Filter by host (mall.shopee.co.id)
  - Find authenticated request
  - Copy SPC_EC, and shopee_token in cookies

- Create friends.json

### Running

`node ./src/scripts/`[command_name]

#### List of commands

- `water.js`: plan, water, harvest, and help friend
- `luckdraw.js`: get coin from playing shopee luckydraw
- `live.js`: get coin from watching livestream
- `checkin.js`: get coin from daily checkin.
- `userCoins.js`: get coin balance of all the accounts
