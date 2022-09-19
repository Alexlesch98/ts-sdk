<!-- # 🌟 nibijs - Nibiru TypeScript SDK -->
<p align="center">
<img src="https://raw.githubusercontent.com/NibiruChain/ts-sdk/main/img/nibijs.png" width="100%">
</p>

<p align="center">
The official TypeScript SDK for the Nibiru blockchain
</p>

[![downloads](https://img.shields.io/npm/dm/@nibiruchain/nibijs.svg)](https://www.npmjs.com/package/@nibiruchain/nibijs)
[![npm-version](https://img.shields.io/npm/v/@nibiruchain/nibijs.svg)](https://www.npmjs.com/package/@nibiruchain/nibijs)
[![license](https://img.shields.io/npm/l/express.svg)](https://github.com/NibiruChain/ts-sdk/blob/main/LICENSE)
[![social-discord](https://dcbadge.vercel.app/api/server/sgPw8ZYfpQ?style=flat)](https://discord.gg/sgPw8ZYfpQ)

The NibiJS (`@nibiruchain/nibijs`) package makes it possible to interact with Nibiru from a Node.js or browser environment. `nibijs` provides simple abstractions for core data structures, serialization, key management, API requests, and the submission of transactions. 

The `nibijs` source code can be found in the ["packages" directory](./packages).  The types and classes generated from Nibiru's `.proto` files are inside a separate `npm` package called `@nibiruchain/api`. 

#### Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Codebase structure](#codebase-structure)
- [Development Quick Start](#development-quick-start)
- [🔓 License](#-license)

To learn more about Nibiru, see [docs.nibiru.fi](https://docs.nibiru.fi) 

---

## Installation 

[@nibiruchain/nibijs][npm-nibijs] is available on the npm registry.

[npm-nibijs]: https://www.npmjs.com/package/@nibiruchain/nibijs

```
npm install @nibiruchain/nibijs # or yarn add
```

## Usage 

The entrypoint for `nibijs` is the `Sdk` object, which is meant to mimic the root of a command line interface. It can be used for both queries and transactions.

#### Example: Querying a block 

```ts
import { Testnet, newSdk } from "@nibiruchain/nibijs"
const sdk = newSdk(Testnet, myMnemonic)
const blockHeight = 1
const block = sdk.tmClient.block(blockHeight)
```

#### Example: Sending funds

```ts
import { Testnet, newSdk, newCoins, Coin } from "@nibiruchain/nibijs"
const sdk = newSdk(Testnet, myMnemonic)
const tokens: Coin[] = newCoins(5, "unibi")
const toAddr: string = "..." // bech32 address of the receiving party
let txResp = sdk.tx.sendTokens(toAddr, tokens)
```

#### Example: Transaction with arbitrary messages

```ts
import { Testnet, newSdk, newCoins, Coin, DeliverTxResponse } from "@nibiruchain/nibijs"
import { Msg } from "@nibiruchain/nibijs/msg"

const sdk = newSdk(Testnet, myMnemonic)
let msgs: TxMessage[] = [
  Msg.perp.openPosition({
    tokenPair: pair,
    baseAssetAmountLimit: "0",
    leverage: "1",
    quoteAssetAmount: "10",
    sender: fromAddr,
    side: Side.BUY,
  }),
  Msg.perp.addMargin({
    sender: fromAddr,
    tokenPair: pair,
    margin: newCoin("20", "unusd"),
  }),
]
let txResp: DeliverTxResponse = await sdk.tx.signAndBroadcast(...msgs)
```

## Codebase structure

| Directories of `@nibiruchain/nibijs` | Purpose/Utility |
| :-------- | -------- |
| `common` | home to several commonly needed types, constants and configurations such as Network.
| `msg`    | Implements functions for creating messages (`Msg`s). These are objects that trigger state-transitions and get wrapped into transactions. 
| `query`  | For querying state via the consensus engine of a full-node and the application blockchain interface (ABCI).
| `tx`     | For signing and to submitting transactions given a set of `Msg` objects.
| `wallet` | A simple wrapper around the Keplr wallet. This module will grow as support is added for other wallets (like MetaMask). |

`@nibiruchain/api` provides types generated from the protocol buffers of the Cosmos-SDK, Tendermint Core, and Nibiru Chain. For most use cases, it won't be necessary to interact with this layer.

---

<!-- 
## 📜 Contribution Guidelines  

TODO
-->

## Development Quick Start 

1. First install yarn.
    ```sh
    npm install -g yarn
    ```

2. Then, install package dependencies. At the root of the repository, run 
    ```sh
    yarn 
    ```
3. Lastly, compile the code in each package.
    ```sh
    yarn build
    ```

See [HACKING.md](./HACKING.md) for the full development guide. 

---

## 🔓 License

This software is licensed under the MIT license. See [LICENSE](./LICENSE) for full disclosure.

© 2022 Nibi, Inc.

<p align="center">
<img src="https://raw.githubusercontent.com/NibiruChain/ts-sdk/main/img/nibi-logo-onwhite.png" width="300">
</p>
