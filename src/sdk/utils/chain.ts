import { fetch } from "cross-fetch"
import { Result } from "."

/**
 * Specifies chain information for all endpoints a Nibiru node exposes such as the
 * gRPC server, Tendermint RPC endpoint, and REST server.
 *
 * @see https://docs.cosmos.network/master/core/grpc_rest.html
 * @export
 * @interface Chain
 * @typedef {Chain}
 */
export interface Chain {
  /** endptTm: endpoint for the Tendermint RPC server. Usually on port 26657. */
  endptTm: string
  /** endptRest: endpoint for the REST server. Also, the LCD endpoint. */
  endptRest: string
  /** endptGrpc: endpoint for the gRPC gateway. Usually on port 9090. */
  endptGrpc: string
  /** endptHm: endpoint for the heart monitor. */
  endptHm: string
  /** endptWs: endpoint for the web socket. */
  endptWs: string
  /** chainId: identifier for the chain */
  chainId: string
  /** chainName: the name of the chain to display to the user */
  chainName: string
  /** feeDenom: the denomination of the fee to be paid for transactions. */
  feeDenom: string
}

/** ChainIdParts: An object mapping to the standard strucutre of Nibiru Chain
 * identifier. Generally, the CometBFT RPC, gRPC, and REST endpoints can be
 * deduced from `ChainIdParts`.
 * @example
 * let chain: ChainIdParts = {
 *   shortName: "cataclysm", number: 1, mainnet: true,
 * }
 * chain = { prefix: "nibiru", shortName: "testnet", number: 1 }
 * */
export interface ChainIdParts {
  prefix?: string // e.g. `nibiru`
  shortName: string // e.g. `testnet`
  number: number // e.g. `1`
  mainnet?: boolean
}

/** CustomChain is a convenience class for intializing the endpoints of a chain
 * based on its chain ID.
 *
 * @example
 * ```ts
 * export const chain = new CustomChain({
 *   prefix: "nibiru",
 *   shortName: "testnet",
 *   number: 1,
 * })
 * ```
 */
export class CustomChain implements Chain {
  public readonly chainId: string
  public readonly chainName: string
  public readonly endptTm: string
  public readonly endptRest: string
  public readonly endptGrpc: string
  public readonly endptHm: string
  public readonly endptWs: string
  public readonly feeDenom = "unibi"

  private readonly chainIdParts: ChainIdParts

  constructor(chainIdParts: ChainIdParts) {
    this.chainIdParts = chainIdParts
    this.chainId = this.initChainId()
    this.chainName = this.chainId

    const chainEndpt = chainIdParts.mainnet
      ? ""
      : `.${chainIdParts.shortName}-${chainIdParts.number}`

    this.endptTm = `https://rpc${chainEndpt}.nibiru.fi`
    this.endptRest = `https://lcd${chainEndpt}.nibiru.fi`
    this.endptGrpc = `grpc${chainEndpt}.nibiru.fi`
    this.endptHm = `https://hm-graphql${chainEndpt}.nibiru.fi/query`
    this.endptWs = `wss://hm-graphql${chainEndpt}.nibiru.fi/query`
  }

  public static fromChainId(chainId: string): Chain {
    const parts = chainId.split("-")
    const chainIdParts: ChainIdParts = {
      prefix: parts[0],
      shortName: parts[1],
      number: parseInt(parts[2]),
    }
    return new CustomChain(chainIdParts)
  }

  private initChainId = () => {
    const { prefix, shortName, number } = this.chainIdParts
    return [prefix, shortName, number]
      .filter((v) => Boolean(v) || Number(v) === 0)
      .join("-")
  }
}

/** Localnet: "Chain" configuration for a local Nibiru network. A local
 * environment is no different from a real one, except that it has a single
 * validator running on your host machine. Localnet is primarily used as a
 * controllable, isolated development environment for testing purposes. */
export const Localnet: Chain = {
  endptTm: "http://127.0.0.1:26657",
  endptRest: "http://127.0.0.1:1317",
  endptGrpc: "http://127.0.0.1:9090",
  endptHm: "http://127.0.0.1:5555/query",
  endptWs: "ws://127.0.0.1:5555/query",
  chainId: "nibiru-localnet-0",
  chainName: "Nibiru Localnet (Default)",
  feeDenom: "unibi",
}

/** Testnet: "Chain" configuration for a Nibiru testnet. These are public
 * networks that are upgraded in advance of Nibiru's mainnet network as a
 * beta-testing environments.
 *
 * For an updated list of active networks, see:
 *
 * - <a href="https://nibiru.fi/docs/">Nibiru Networks | Nibiru Docs (Recommended)</a>
 * - <a href="https://github.com/NibiruChain/Networks/tree/main">NibiruChain/Networks (GitHub)</a>
 *
 * By default, the "Testnet" function returns the permanent testnet if no
 * arguments are passed.
 * */
export const Testnet = (chainNumber = 1) =>
  new CustomChain({
    prefix: "nibiru",
    shortName: "testnet",
    number: chainNumber,
  })

/** @deprecated Incentivized testnet is no longer active. This variable exists
 * for backwards compatibility, but "Testnet" should be used instead.
 *
 * @see Testnet - Permanent Nibiru public test network.
 */
export const IncentivizedTestnet = Testnet

/** Devnet: "Chain" configuration for a Nibiru "devnet". These networks
 * are more ephemeral than "Testnet" and used internally by the core Nibiru
 * dev team to live-test new features before official public release.
 * */
export const Devnet = (chainNumber: number) =>
  new CustomChain({
    prefix: "nibiru",
    shortName: "devnet",
    number: chainNumber,
  })

/** Mainnet: "Chain" configuration for the Nibiru "mainnet".
 * ❗ Mainnet uses real funds. For more info, see
 * <a href="https://nibiru.fi/docs/dev/networks/">Nibiru Netwokrs</a>.
 * */
export const Mainnet = (chainNumber = 1) =>
  new CustomChain({
    shortName: "cataclysm",
    number: chainNumber,
    mainnet: true,
  })

export const queryChainIdWithRest = async (
  chain: Chain
): Promise<Result<string>> => {
  const queryChainId = async (chain: Chain): Promise<string> => {
    const response = await fetch(
      `${chain.endptRest}/cosmos/base/tendermint/v1beta1/node_info`
    )
    const nodeInfo: { default_node_info: { network: string } } =
      await response.json()
    return nodeInfo.default_node_info.network
  }

  return Result.ofSafeExecAsync(async () => queryChainId(chain))
}

/** isRestEndptLive: Makes a request using the chain's REST endpoint to see if
 * the network and endpoint are active. */
export const isRestEndptLive = async (chain: Chain): Promise<boolean> => {
  const res = await queryChainIdWithRest(chain)
  return res.isOk()
}

/**
 * Converts a Chain object to its constituent parts.
 * @param chain a Chain object
 * @returns a ChainIdParts object
 */
export const chainToParts = (chain: Chain) => {
  const parts = chain.chainId.split("-")
  return {
    prefix: parts[0],
    shortName: parts[1],
    number: Number(parts[2]),
  } as ChainIdParts
}

export const ChainSchema = (chain: CustomChain) => ({
  $schema: "../chain.schema.json",
  chain_name: chain.chainName,
  status: "live",
  network_type: chain.chainName.includes("cataclysm") ? "mainnet" : "testnet",
  website: "https://nibiru.fi/",
  update_link: "",
  pretty_name: "Nibiru",
  chain_id: chain.chainId,
  bech32_prefix: "nibi",
  bech32_config: {
    bech32PrefixAccAddr: "nibi",
    bech32PrefixAccPub: "nibipub",
    bech32PrefixValAddr: "nibivaloper",
    bech32PrefixValPub: "nibivaloperpub",
    bech32PrefixConsAddr: "nibivalcons",
    bech32PrefixConsPub: "nibivalconspub",
  },
  daemon_name: "nibid",
  node_home: "$HOME/.nibid",
  key_algos: ["secp256k1"],
  slip44: 118,
  fees: {
    fee_tokens: [
      {
        denom: "unibi",
        fixed_min_gas_price: 0.01 * 5,
        low_gas_price: 0.01 * 5,
        average_gas_price: 0.025 * 5,
        high_gas_price: 0.04 * 5,
      },
    ],
  },
  staking: { staking_tokens: [{ denom: "unibi" }] },
  codebase: {
    git_repo: "https://github.com/NibiruChain/nibiru",
    recommended_version: "v0.21.11",
    compatible_versions: ["v0.21.11"],
    binaries: {
      "darwin/amd64":
        "https://github.com/NibiruChain/nibiru/releases/download/v0.21.11/nibid_0.21.11_darwin_amd64.tar.gz",
      "darwin/arm64":
        "https://github.com/NibiruChain/nibiru/releases/download/v0.21.11/nibid_0.21.11_darwin_arm64.tar.gz",
      "linux/amd64":
        "https://github.com/NibiruChain/nibiru/releases/download/v0.21.11/nibid_0.21.11_linux_amd64.tar.gz",
      "linux/arm64":
        "https://github.com/NibiruChain/nibiru/releases/download/v0.21.11/nibid_0.21.11_linux_arm64.tar.gz",
    },
    cosmos_sdk_version: "", // to be filled
    consensus: {
      type: "tendermint",
      version: "informalsystems/tendermint@0.34.24",
    },
    cosmwasm_version: "", // to be filled
    cosmwasm_enabled: false,
    ibc_go_version: "", //to be filled
    ics_enabled: [],
    genesis: {
      name: "",
      genesis_url: "",
    },
    versions: [],
  },
  images: [
    {
      svg: "https://github.com/NibiruChain/explorer/blob/master/public/logo.svg",
      theme: {
        primary_color_hex: "#1E173D",
      },
    },
  ],
  logo_URIs: {
    png: "https://github.com/NibiruChain/explorer/blob/master/public/logo.png",
    svg: "https://nibiru.fi/assets/nibi-logo-smooth.727efedc.svg",
  },
  peers: { seeds: [], persistent_peers: [] },
  apis: {
    rpc: [{ address: chain.endptTm, provider: "Nibiru Foundation" }],
    rest: [{ address: chain.endptRest, provider: "Nibiru Foundation" }],
    grpc: [{ address: chain.endptGrpc, provider: "Nibiru Foundation" }],
  },
  explorers: [
    {
      kind: "explorers.nibiru",
      url: "https://explorer.nibiru.fi/",
      tx_page:
        "https://explorer.nibiru.fi/" + chain.chainName + "/tx/${txHash}",
      account_page:
        "https://explorer.nibiru.fi/" +
        chain.chainName +
        "/account/${accountAddress}",
    },
  ],
  keywords: ["nibi", "unibi", "unusd", "nusd", "NIBI", "Nibiru", "NibiruChain"],
})
