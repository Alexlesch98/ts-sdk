// @generated by protoc-gen-es v1.2.1 with parameter "target=ts"
// @generated from file nibiru/perp/v2/query.proto (package nibiru.perp.v2, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type {
  BinaryReadOptions,
  FieldList,
  JsonReadOptions,
  JsonValue,
  PartialMessage,
  PlainMessage,
} from "@bufbuild/protobuf"
import { Message, proto3 } from "@bufbuild/protobuf"
import { AMM, Market, Position } from "./state_pb.js"
import { Coin } from "../../../cosmos/base/v1beta1/coin_pb.js"

/**
 * @generated from message nibiru.perp.v2.QueryPositionsRequest
 */
export class QueryPositionsRequest extends Message<QueryPositionsRequest> {
  /**
   * @generated from field: string trader = 1;
   */
  trader = ""

  constructor(data?: PartialMessage<QueryPositionsRequest>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = "nibiru.perp.v2.QueryPositionsRequest"
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "trader", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): QueryPositionsRequest {
    return new QueryPositionsRequest().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): QueryPositionsRequest {
    return new QueryPositionsRequest().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): QueryPositionsRequest {
    return new QueryPositionsRequest().fromJsonString(jsonString, options)
  }

  static equals(
    a: QueryPositionsRequest | PlainMessage<QueryPositionsRequest> | undefined,
    b: QueryPositionsRequest | PlainMessage<QueryPositionsRequest> | undefined,
  ): boolean {
    return proto3.util.equals(QueryPositionsRequest, a, b)
  }
}

/**
 * @generated from message nibiru.perp.v2.QueryPositionsResponse
 */
export class QueryPositionsResponse extends Message<QueryPositionsResponse> {
  /**
   * @generated from field: repeated nibiru.perp.v2.QueryPositionResponse positions = 1;
   */
  positions: QueryPositionResponse[] = []

  constructor(data?: PartialMessage<QueryPositionsResponse>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = "nibiru.perp.v2.QueryPositionsResponse"
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: "positions",
      kind: "message",
      T: QueryPositionResponse,
      repeated: true,
    },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): QueryPositionsResponse {
    return new QueryPositionsResponse().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): QueryPositionsResponse {
    return new QueryPositionsResponse().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): QueryPositionsResponse {
    return new QueryPositionsResponse().fromJsonString(jsonString, options)
  }

  static equals(
    a: QueryPositionsResponse | PlainMessage<QueryPositionsResponse> | undefined,
    b: QueryPositionsResponse | PlainMessage<QueryPositionsResponse> | undefined,
  ): boolean {
    return proto3.util.equals(QueryPositionsResponse, a, b)
  }
}

/**
 * QueryPositionRequest is the request type for the position of the x/perp
 * module account.
 *
 * @generated from message nibiru.perp.v2.QueryPositionRequest
 */
export class QueryPositionRequest extends Message<QueryPositionRequest> {
  /**
   * @generated from field: string pair = 1;
   */
  pair = ""

  /**
   * @generated from field: string trader = 2;
   */
  trader = ""

  constructor(data?: PartialMessage<QueryPositionRequest>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = "nibiru.perp.v2.QueryPositionRequest"
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "pair", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "trader", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): QueryPositionRequest {
    return new QueryPositionRequest().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): QueryPositionRequest {
    return new QueryPositionRequest().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): QueryPositionRequest {
    return new QueryPositionRequest().fromJsonString(jsonString, options)
  }

  static equals(
    a: QueryPositionRequest | PlainMessage<QueryPositionRequest> | undefined,
    b: QueryPositionRequest | PlainMessage<QueryPositionRequest> | undefined,
  ): boolean {
    return proto3.util.equals(QueryPositionRequest, a, b)
  }
}

/**
 * @generated from message nibiru.perp.v2.QueryPositionResponse
 */
export class QueryPositionResponse extends Message<QueryPositionResponse> {
  /**
   * The position as it exists in the blockchain state
   *
   * @generated from field: nibiru.perp.v2.Position position = 1;
   */
  position?: Position

  /**
   * The position's current notional value, if it were to be entirely closed (in
   * margin units).
   *
   * @generated from field: string position_notional = 2;
   */
  positionNotional = ""

  /**
   * The position's unrealized PnL.
   *
   * @generated from field: string unrealized_pnl = 3;
   */
  unrealizedPnl = ""

  /**
   * margin ratio of the position based on the spot price
   *
   * @generated from field: string margin_ratio = 4;
   */
  marginRatio = ""

  constructor(data?: PartialMessage<QueryPositionResponse>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = "nibiru.perp.v2.QueryPositionResponse"
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "position", kind: "message", T: Position },
    { no: 2, name: "position_notional", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "unrealized_pnl", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "margin_ratio", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): QueryPositionResponse {
    return new QueryPositionResponse().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): QueryPositionResponse {
    return new QueryPositionResponse().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): QueryPositionResponse {
    return new QueryPositionResponse().fromJsonString(jsonString, options)
  }

  static equals(
    a: QueryPositionResponse | PlainMessage<QueryPositionResponse> | undefined,
    b: QueryPositionResponse | PlainMessage<QueryPositionResponse> | undefined,
  ): boolean {
    return proto3.util.equals(QueryPositionResponse, a, b)
  }
}

/**
 * @generated from message nibiru.perp.v2.QueryModuleAccountsRequest
 */
export class QueryModuleAccountsRequest extends Message<QueryModuleAccountsRequest> {
  constructor(data?: PartialMessage<QueryModuleAccountsRequest>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = "nibiru.perp.v2.QueryModuleAccountsRequest"
  static readonly fields: FieldList = proto3.util.newFieldList(() => [])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): QueryModuleAccountsRequest {
    return new QueryModuleAccountsRequest().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): QueryModuleAccountsRequest {
    return new QueryModuleAccountsRequest().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): QueryModuleAccountsRequest {
    return new QueryModuleAccountsRequest().fromJsonString(jsonString, options)
  }

  static equals(
    a:
      | QueryModuleAccountsRequest
      | PlainMessage<QueryModuleAccountsRequest>
      | undefined,
    b:
      | QueryModuleAccountsRequest
      | PlainMessage<QueryModuleAccountsRequest>
      | undefined,
  ): boolean {
    return proto3.util.equals(QueryModuleAccountsRequest, a, b)
  }
}

/**
 * @generated from message nibiru.perp.v2.QueryModuleAccountsResponse
 */
export class QueryModuleAccountsResponse extends Message<QueryModuleAccountsResponse> {
  /**
   * @generated from field: repeated nibiru.perp.v2.AccountWithBalance accounts = 1;
   */
  accounts: AccountWithBalance[] = []

  constructor(data?: PartialMessage<QueryModuleAccountsResponse>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = "nibiru.perp.v2.QueryModuleAccountsResponse"
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "accounts", kind: "message", T: AccountWithBalance, repeated: true },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): QueryModuleAccountsResponse {
    return new QueryModuleAccountsResponse().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): QueryModuleAccountsResponse {
    return new QueryModuleAccountsResponse().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): QueryModuleAccountsResponse {
    return new QueryModuleAccountsResponse().fromJsonString(jsonString, options)
  }

  static equals(
    a:
      | QueryModuleAccountsResponse
      | PlainMessage<QueryModuleAccountsResponse>
      | undefined,
    b:
      | QueryModuleAccountsResponse
      | PlainMessage<QueryModuleAccountsResponse>
      | undefined,
  ): boolean {
    return proto3.util.equals(QueryModuleAccountsResponse, a, b)
  }
}

/**
 * @generated from message nibiru.perp.v2.AccountWithBalance
 */
export class AccountWithBalance extends Message<AccountWithBalance> {
  /**
   * @generated from field: string name = 1;
   */
  name = ""

  /**
   * @generated from field: string address = 2;
   */
  address = ""

  /**
   * @generated from field: repeated cosmos.base.v1beta1.Coin balance = 3;
   */
  balance: Coin[] = []

  constructor(data?: PartialMessage<AccountWithBalance>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = "nibiru.perp.v2.AccountWithBalance"
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "address", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "balance", kind: "message", T: Coin, repeated: true },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): AccountWithBalance {
    return new AccountWithBalance().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): AccountWithBalance {
    return new AccountWithBalance().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): AccountWithBalance {
    return new AccountWithBalance().fromJsonString(jsonString, options)
  }

  static equals(
    a: AccountWithBalance | PlainMessage<AccountWithBalance> | undefined,
    b: AccountWithBalance | PlainMessage<AccountWithBalance> | undefined,
  ): boolean {
    return proto3.util.equals(AccountWithBalance, a, b)
  }
}

/**
 * @generated from message nibiru.perp.v2.AmmMarket
 */
export class AmmMarket extends Message<AmmMarket> {
  /**
   * @generated from field: nibiru.perp.v2.Market market = 1;
   */
  market?: Market

  /**
   * @generated from field: nibiru.perp.v2.AMM amm = 2;
   */
  amm?: AMM

  constructor(data?: PartialMessage<AmmMarket>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = "nibiru.perp.v2.AmmMarket"
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "market", kind: "message", T: Market },
    { no: 2, name: "amm", kind: "message", T: AMM },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): AmmMarket {
    return new AmmMarket().fromBinary(bytes, options)
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AmmMarket {
    return new AmmMarket().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): AmmMarket {
    return new AmmMarket().fromJsonString(jsonString, options)
  }

  static equals(
    a: AmmMarket | PlainMessage<AmmMarket> | undefined,
    b: AmmMarket | PlainMessage<AmmMarket> | undefined,
  ): boolean {
    return proto3.util.equals(AmmMarket, a, b)
  }
}

/**
 * @generated from message nibiru.perp.v2.QueryMarketsRequest
 */
export class QueryMarketsRequest extends Message<QueryMarketsRequest> {
  constructor(data?: PartialMessage<QueryMarketsRequest>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = "nibiru.perp.v2.QueryMarketsRequest"
  static readonly fields: FieldList = proto3.util.newFieldList(() => [])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): QueryMarketsRequest {
    return new QueryMarketsRequest().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): QueryMarketsRequest {
    return new QueryMarketsRequest().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): QueryMarketsRequest {
    return new QueryMarketsRequest().fromJsonString(jsonString, options)
  }

  static equals(
    a: QueryMarketsRequest | PlainMessage<QueryMarketsRequest> | undefined,
    b: QueryMarketsRequest | PlainMessage<QueryMarketsRequest> | undefined,
  ): boolean {
    return proto3.util.equals(QueryMarketsRequest, a, b)
  }
}

/**
 * @generated from message nibiru.perp.v2.QueryMarketsResponse
 */
export class QueryMarketsResponse extends Message<QueryMarketsResponse> {
  /**
   * @generated from field: repeated nibiru.perp.v2.AmmMarket amm_markets = 1;
   */
  ammMarkets: AmmMarket[] = []

  constructor(data?: PartialMessage<QueryMarketsResponse>) {
    super()
    proto3.util.initPartial(data, this)
  }

  static readonly runtime: typeof proto3 = proto3
  static readonly typeName = "nibiru.perp.v2.QueryMarketsResponse"
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "amm_markets", kind: "message", T: AmmMarket, repeated: true },
  ])

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): QueryMarketsResponse {
    return new QueryMarketsResponse().fromBinary(bytes, options)
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): QueryMarketsResponse {
    return new QueryMarketsResponse().fromJson(jsonValue, options)
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): QueryMarketsResponse {
    return new QueryMarketsResponse().fromJsonString(jsonString, options)
  }

  static equals(
    a: QueryMarketsResponse | PlainMessage<QueryMarketsResponse> | undefined,
    b: QueryMarketsResponse | PlainMessage<QueryMarketsResponse> | undefined,
  ): boolean {
    return proto3.util.equals(QueryMarketsResponse, a, b)
  }
}
