# Shopee Coin Miner

Simple node.js script to automate shopee coin mining.

## Features

### Work In Progres

- Shopee Goyang Pohon
- Shopee Capit

### Done Feature

- Shopee Tanam (self watering, harvesting, planting, help friends)
- Shopee Checkin (auto checkin)
- Shopee Lucky Draw (auto draw)
- Shopee Poly (Boardgame)
- Shopee Live

### Next Feature

- Shopee feed (auto comment & like)
- Shopee review (photo, video, comment, rating)

### Future

- shopee-auto-cart
- cli?

## How to use

### Requirements

- node.js >= 10
- Rooted Android phone (emulator / smartphone) (used only once)

### Setup

- Create credentials.json
  | field | type | desc |
  |------------- |--------- |------------------------------------------------------------------ |
  | name | string | shopee username |
  | token | string | SPC_EC token |
  | shopeeToken | string | shopee_token |
  | deviceId | string | one device one id, one deviceId can be used for multiple account |
  | userId | int | shopee account id |
  | help | boolean | Help other people? |

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

`node ./src/cron/`[command_name]

#### List of commands

- water.js: plan, water, harvest, and help friend
- luckdraw.js: get coint from playing shopee luckydraw
- live.js: get coin from watching livestream
- checkin.js: get coin from daily checkin.
- userCoins.js: get coin of all accounts
