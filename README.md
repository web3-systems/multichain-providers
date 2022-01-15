# Multichain Providers
![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
![Build](https://github.com/web3-systems/multichain-providers/actions/workflows/main.yml/badge.svg)
[![GPLv3 license](https://img.shields.io/badge/License-MIT-blue.svg)](http://perso.crans.org/besson/LICENSE.html)

The `@web3-systems/multichain-providers` [node module package](https://www.npmjs.com/package/@pooltogether/v4-utils-js) provides a multichain provider management system to easily read/write to EVM provider endpoints.

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

# Quickstart (Get Transaction History using EtherscanProvider)

```ts
import { MultichainProviders } from '@web3-systems/multichain-providers';

let apikey = 'etherscan/polygonscan/snowtrace-apikey'
let client = new MultichainProviders(1, apikey, 'chainscan');
const transactions = await client.getTransactions(1, '0xd24fa211e03E82873980296D11f0318BdD329fbd');
```

## Connect New Provider
```ts
import { MultichainProviders } from '@web3-systems/multichain-providers';

let client = new MultichainProviders(); // by default connect to Ethereum mainnet via Infura
let jsonRpcURL = 'localhost:8545'
client.connect(1, jsonRpcURL); // sets chainId to use localhost as the endpoint 
```


## Connect New Provider
```ts
import { MultichainProviders } from '@web3-systems/multichain-providers';

const client = new MultichainProviders();
const balance  = await client.getBalance(1, '0x000...000');
```