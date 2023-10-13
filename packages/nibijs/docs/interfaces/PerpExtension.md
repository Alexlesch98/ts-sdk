[NibiJS Documentation - v0.21.34](../intro.md) / [Exports](../modules.md) / PerpExtension

# Interface: PerpExtension

## Table of contents

### Properties

- [perp](PerpExtension.md#perp)

## Properties

### perp

• **perp**: `Readonly`<{ `markets`: () => `Promise`<`QueryMarketsResponse`\> ; `moduleAccounts`: () => `Promise`<`QueryModuleAccountsResponse`\> ; `position`: (`args`: { `pair`: `string` ; `trader`: `string` }) => `Promise`<`QueryPositionResponse`\> ; `positions`: (`args`: { `trader`: `string` }) => `Promise`<`QueryPositionsResponse`\> }\>

#### Defined in

[query/perp.ts:24](https://github.com/NibiruChain/ts-sdk/blob/f9e55f7/packages/nibijs/src/query/perp.ts#L24)
