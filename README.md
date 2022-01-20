# Shopee Coin Miner

Simple `nodejs` script to earn shopee coin automatically (🇮🇩)

## ⚠️ Disclaimer

- Using this script violate Shopee Terms of Service, do at your own risk!

- Only work for Indonesian Shopee (shopee.co.id)

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

- `nodejs` >= 10
- Rooted Android phone (emulator / smartphone) (used to get user credentials)

### Setup

- Create `credentials.json` : List of all credentials of your accounts

  ```json
  [
    {
      "name": "shopee username",
      "token": "SPC_EC token",
      "shopeeToken": "shopee_token",
      "deviceId": "unique identifier",
      "userId": 123,
      "help": true
    }
  ]
  ```

  To find `shopeeToken` and `token` you can use `HTTPCanary` to capture shopee app data using rooted android device. Here's some quick steps:

  - Install `HTTPCanary`
  - Enable capture in `HTTPCanary`
  - Open Shopee app
  - Login using your account
  - Open `HTTPCanary`
  - Filter by host (mall.shopee.co.id)
  - Find authenticated request
  - Copy `SPC_EC`, and `shopee_token` in cookies

- Create `friends.json` : List of friends account you want to help
  ```json
  [
    {
      "name": "shopee_username",
      "userId": 0,
      "help": true
    }
  ]
  ```

### Running

`node ./src/scripts/`[command_name]

#### List of commands

- `water.js`: plan, water, harvest, and help friend
- `luckdraw.js`: get coin from playing shopee luckydraw
- `live.js`: get coin from watching livestream
- `checkin.js`: get coin from daily checkin.
- `userCoins.js`: get coin balance of all the accounts
