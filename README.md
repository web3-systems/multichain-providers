# Multichain Providers
![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
![Build](https://github.com/web3-systems/multichain-providers/actions/workflows/main.yml/badge.svg)
[![GPLv3 license](https://img.shields.io/badge/License-MIT-blue.svg)](http://perso.crans.org/besson/LICENSE.html)

The `@web3-systems/multichain-providers` [node module package](https://www.npmjs.com/package/@pooltogether/v4-utils-js) simplifies multi-EVM-chain provider read and writes.

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

The MultichainProvider class wraps the `@ethersproject/providers` Provider function calls.

Updating core function signatures with `chainId` argument to specify a target network/blockchain.

**Example**

`provider.getBalance('0x000.0000')` becomes `multiprovider.etBalance(1, '0x000.0000');`

Utility functions like `getTransactions` and `getLogsDecoded` have been included to encapsulate common method chaining. 

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