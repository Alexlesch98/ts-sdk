import { AccountData, coin, coins, parseCoins } from "@cosmjs/proto-signing"
import { assertIsDeliverTxSuccess, DeliverTxResponse } from "@cosmjs/stargate"
import {
  MsgAddMargin,
  MsgClosePosition,
  MsgMarketOrder,
  MsgRemoveMargin,
} from "@nibiruchain/protojs/dist/nibiru/perp/v2/tx"
import { Direction } from "@nibiruchain/protojs/dist/nibiru/perp/v2/state"
import { TxLog } from "../chain"
import { Msg, TxMessage } from "../msg"
import { PERP_MSG_TYPE_URLS } from "../msg/perp"
import { NibiruQuerier } from "../query/query"
import {
  assertHasEventType,
  assertHasMsgType,
  assertExpectedError,
  TEST_CHAIN,
  TEST_ADDRESS,
  TEST_MNEMONIC,
  ERR,
} from "../testutil"
import { newRandomWallet, newSignerFromMnemonic } from "./signer"
import { NibiruTxClient } from "./txClient"

describe("txClient", () => {
  test("connects", async () => {
    const txClient = await NibiruTxClient.connect(TEST_CHAIN.endptTm)
    expect(txClient).toBeTruthy()
  })
})

describe("nibid tx bank send", () => {
  test("send tokens from the devnet genesis validator to a random account", async () => {
    const signer = await newSignerFromMnemonic(TEST_MNEMONIC)
    const [{ address: fromAddr }]: readonly AccountData[] =
      await signer.getAccounts()
    expect(fromAddr).toBeDefined()

    const txClient = await NibiruTxClient.connectWithSigner(
      TEST_CHAIN.endptTm,
      signer
    )

    const toWallet = await newRandomWallet()
    const [{ address: toAddr }] = await toWallet.getAccounts()

    const resp = await txClient.sendTokens(
      fromAddr,
      toAddr,
      parseCoins("1unibi"),
      400000
    )
    assertIsDeliverTxSuccess(resp)

    const querier = await NibiruQuerier.connect(TEST_CHAIN.endptTm)
    const txQuery = await querier.getTxByHash(resp.transactionHash)
    expect(txQuery.isOk()).toBeTruthy()
  })
})

describe("nibid tx perp", () => {
  const pair = "ubtc:unusd"

  test("open-position, add-margin, remove-margin", async () => {
    const signer = await newSignerFromMnemonic(TEST_MNEMONIC)
    const txClient = await NibiruTxClient.connectWithSigner(
      TEST_CHAIN.endptTm,
      signer
    )
    const [{ address: sender }] = await signer.getAccounts()

    const fee = {
      amount: coins(10_000, "unibi"),
      gas: "400000",
    }

    const msgs: TxMessage[] = [
      {
        typeUrl: PERP_MSG_TYPE_URLS.MsgMarketOrder,
        value: MsgMarketOrder.fromPartial({
          pair,
          baseAssetAmountLimit: "0",
          leverage: "10",
          quoteAssetAmount: "1000",
          sender,
          side: Direction.LONG,
        }),
      },
      {
        typeUrl: PERP_MSG_TYPE_URLS.MsgAddMargin,
        value: MsgAddMargin.fromPartial({
          margin: coin(20, "unusd"),
          pair,
          sender,
        }),
      },
      {
        typeUrl: PERP_MSG_TYPE_URLS.MsgRemoveMargin,
        value: MsgRemoveMargin.fromPartial({
          margin: coin(5, "unusd"),
          pair,
          sender,
        }),
      },
      Msg.perp.openPosition({
        sender,
        pair,
        goLong: false,
        quoteAssetAmount: 200,
        leverage: 4,
      }),
    ]

    const assertHappyPath = (result: DeliverTxResponse) => {
      const txLogs: TxLog[] = JSON.parse(result.rawLog!)
      expect(txLogs).toHaveLength(4)

      // perp tx open-position events
      let idx = 0
      assertHasMsgType(PERP_MSG_TYPE_URLS.MsgMarketOrder, txLogs[idx].events)
      assertHasEventType(
        "nibiru.perp.v1.PositionChangedEvent",
        txLogs[idx].events
      )
      assertHasEventType("transfer", txLogs[idx].events)

      // perp tx add-margin events
      idx = 1
      assertHasMsgType(PERP_MSG_TYPE_URLS.MsgAddMargin, txLogs[idx].events)
      assertHasEventType(
        "nibiru.perp.v1.PositionChangedEvent",
        txLogs[idx].events
      )
      assertHasEventType("transfer", txLogs[idx].events)

      // perp tx remove-margin events
      idx = 2
      assertHasMsgType(PERP_MSG_TYPE_URLS.MsgRemoveMargin, txLogs[idx].events)
      assertHasEventType(
        "nibiru.perp.v1.PositionChangedEvent",
        txLogs[idx].events
      )
      assertHasEventType("transfer", txLogs[idx].events)

      // perp tx open-position events
      idx = 3
      assertHasMsgType(PERP_MSG_TYPE_URLS.MsgAddMargin, txLogs[idx].events)
      assertHasEventType(
        "nibiru.perp.v1.PositionChangedEvent",
        txLogs[idx].events
      )
      assertHasEventType("transfer", txLogs[idx].events)
    }

    try {
      const result = await txClient.signAndBroadcast(sender, msgs, fee)

      assertIsDeliverTxSuccess(result)
      assertHappyPath(result)
    } catch (error) {
      const okErrors: string[] = [ERR.collections, ERR.noPrices, ERR.sequence]

      let err = error as any
      if (err.rawLog) {
        err = err.rawLog
      }
      assertExpectedError(err, okErrors)
    }
  }, 40_000 /* default timeout is not sufficient. */)

  test("nibid query perp positions", async () => {
    const querier = await NibiruQuerier.connect(TEST_CHAIN.endptTm)
    const resp = await querier.nibiruExtensions.perp.positions({
      trader: TEST_ADDRESS,
    })
    resp.positions.forEach((position) => {
      const fields = [
        position.position,
        position.unrealizedPnl,
        position.positionNotional,
      ]
      fields.forEach((val) => expect(val).toBeDefined())
    })
  })

  test("nibid tx perp close-position", async () => {
    const signer = await newSignerFromMnemonic(TEST_MNEMONIC)
    const txClient = await NibiruTxClient.connectWithSigner(
      TEST_CHAIN.endptTm,
      signer
    )
    const [{ address: sender }] = await signer.getAccounts()

    const fee = {
      amount: coins(12_500, "unibi"),
      gas: "500000",
    }

    const msgs: TxMessage[] = [
      {
        typeUrl: PERP_MSG_TYPE_URLS.MsgClosePosition,
        value: MsgClosePosition.fromPartial({
          pair,
          sender,
        }),
      },
    ]

    const assertHappyPath = (result: DeliverTxResponse) => {
      const txLogs: TxLog[] = JSON.parse(result.rawLog!)
      expect(txLogs).toHaveLength(1)

      // perp tx close-position events
      assertHasMsgType(PERP_MSG_TYPE_URLS.MsgClosePosition, txLogs[0].events)
      assertHasEventType(
        "nibiru.perp.v1.PositionChangedEvent",
        txLogs[0].events
      )
      assertHasEventType("transfer", txLogs[0].events)
    }

    try {
      const result = await txClient.signAndBroadcast(sender, msgs, fee)
      assertIsDeliverTxSuccess(result)
      assertHappyPath(result)
    } catch (error) {
      const okErrors: string[] = [ERR.collections, ERR.sequence]

      let err = error as any
      if (err.rawLog) {
        err = err.rawLog
      }
      assertExpectedError(err, okErrors)
    }
  })
})