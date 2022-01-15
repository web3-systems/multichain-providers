# ⛓️ Multichain Providers
![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
![Build](https://github.com/web3-systems/multichain-providers/actions/workflows/main.yml/badge.svg)
[![GPLv3 license](https://img.shields.io/badge/License-MIT-blue.svg)](http://perso.crans.org/besson/LICENSE.html)

The `@web3-systems/multichain-providers` [node module](https://www.npmjs.com/package/@pooltogether/v4-utils-js) simplifies multi-EVM-chain provider read/writes.

# 💾 Installation

Install NPM package:

```sh
npm install @web3-systems/multichain-providers
```

```sh
yarn add @web3-systems/multichain-providers
```

Clone from Github:

```sh
git clone https://github.com/web3-systems/multichain-providers
```

# 💻 Developer Experience

The package is setup using the [TSDX zero-config CLI](https://tsdx.io/) which includes:

- Typescript
- Rollup
- Jest
- Prettier
- ESLint

# Quickstart 

The MultichainProvider class wraps the `@ethersproject/providers` `Provider` class.

Updating function signatures with `chainId` to specify a target network.

**Example**

`provider.getBalance('0x000.0000')` 

is now... 

`multiprovider.getBalance(1, '0x000.0000');`

The function signature (as you can see) now consumes `chainId` in the first argument position. If a provider has been configured for the chainId the provider will be used when fetching the balance.

## Connect New Provider
```ts
import { MultichainProviders } from '@web3-systems/multichain-providers';
let client = new MultichainProviders(); // by default connect to Ethereum mainnet via Infura
let jsonRpcURL = 'localhost:8545'
client.connect(1, jsonRpcURL); // sets chainId to use localhost as the endpoint 
```

## Get Balance
```ts
import { BigNumber } from '@ethersproject/bignumber';
import { MultichainProviders } from '@web3-systems/multichain-providers';
const client = new MultichainProviders();
const balance:BigNumber = await client.getBalance(1, '0x000...000');
```

## Get Provider
```ts
import { Provider } from '@ethersproject/providers';
import { MultichainProviders } from '@web3-systems/multichain-providers';
const client = new MultichainProviders();
const provider:Provider = await client.getProvider(1);
```

## Get Transaction History using EtherscanProvider
```ts
import { Transactions } from '@ethersproject/contracts';
import { MultichainProviders } from '@web3-systems/multichain-providers';
let apikey = 'etherscan/polygonscan/snowtrace-apikey'
let client = new MultichainProviders(1, apikey, 'chainscan');
const transactions: Transactions[] = await client.getTransactions(1, '0x000...000');
```

# **Utlity Functions**

Utility functions like `getTransactions` (specific to Etherscan) and `getLogsDecoded` have been included to simplify common method chaining and developer objectives.

For example, instead of fetching event logs and decoding separately, a single function can be called.

```ts
const events = await client.getLogsDecoded(1,filter,contract,fragment);
/*
[
    {
        log: {...},
        parsed: {...}
    },
    {
        log: {...},
        parsed: {...}
    },
]
*/
```