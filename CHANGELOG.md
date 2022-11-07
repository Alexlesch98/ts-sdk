# CHANGELOG.md

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [v0.7.0](https://github.com/NibiruChain/ts-sdk/compare/v0.7.0-alpha.2...HEAD)

* [[#28]](https://github.com/NibiruChain/ts-sdk/pull/28) test: wait for block fns and test improvements for consistency between runs
* [[#30]](https://github.com/NibiruChain/ts-sdk/pull/30) vpool queries and runnable examples v0.6.1
* [[#31]](https://github.com/NibiruChain/ts-sdk/pull/31) feat: 'vpool' and 'pricefeed' module extensions
* [[#32]](https://github.com/NibiruChain/ts-sdk/pull/32) refactor: fix linter and make updates

## [v0.6.0](https://github.com/NibiruChain/py-sdk/releases/tag/v0.6.0) 2022-09-19

### Features

* Transactions for the `perp` module
* Queries for the `vpool` and `perp` modules
* [[#4]](https://github.com/NibiruChain/ts-sdk/pull/4) test,feat: perp tests and new types for nibiru v0.13. Improved protocgen.sh 
* [[#26]](https://github.com/NibiruChain/ts-sdk/pull/26) feat: changes to newSdk and newTxCmd for #25 
* [[#27]](https://github.com/NibiruChain/ts-sdk/pull/27) feat,test: test wallet, keys,  and faucet commands in 
* docs: Added usage examples to the README
* docs: function-level documentation

### Testing Improvements

The code related to messages, transactions, or queries with Nibi-Perps has 95%+ [test coverage](https://github.com/NibiruChain/ts-sdk/actions/runs/3085927495/jobs/4989760331). 

* [[#1]](https://github.com/NibiruChain/ts-sdk/pull/1) tests: Fix sdk.Dec math conversions in the common package
* [[#2]](https://github.com/NibiruChain/ts-sdk/pull/2) tests: Test bank, dex, and perp queries. Add tests to CI
* [[#3]](https://github.com/NibiruChain/ts-sdk/pull/3) test: test token transfers from the devnet genesis validator
* Multi-message transaction tests in `tx.test.ts`
* [[#21]](https://github.com/NibiruChain/ts-sdk/pull/21) test: testnet connection
* [[#23]](https://github.com/NibiruChain/ts-sdk/pull/23) test: perp module
* [[#24]](https://github.com/NibiruChain/ts-sdk/pull/24) refactor: collapse tx, query, and tmClient into a single sdk object

### Fixes

* [[#7]](https://github.com/NibiruChain/ts-sdk/pull/7) fix: rename HOST to CHAIN_HOST because HOST is reset by CRA 

**Changelog Checkpoint**: https://github.com/NibiruChain/ts-sdk/commits/v0.6.0