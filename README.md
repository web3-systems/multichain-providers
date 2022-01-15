# ⛓️ Multichain Providers
![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
[![GPLv3 license](https://img.shields.io/badge/License-MIT-blue.svg)](http://perso.crans.org/besson/LICENSE.html)
![Build](https://github.com/web3-systems/multichain-providers/actions/workflows/main.yml/badge.svg)

The `@web3-systems/multichain-providers` [node module](https://www.npmjs.com/package/@web3-systems/multichain-providers) simplifies multi-EVM-chain provider read/writes.

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

# 🌐 Quickstart 

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


# MultichainProviders Class

### Constructors

- [constructor](#constructor)

### Properties

- [chainIdDefault](#chainiddefault)
- [getNonce](#getnonce)
- [providers](#providers)

### Methods

- [call](#call)
- [connect](#connect)
- [estimateGas](#estimategas)
- [getBalance](#getbalance)
- [getBlock](#getblock)
- [getBlockNumber](#getblocknumber)
- [getBlockWithTransactions](#getblockwithtransactions)
- [getCode](#getcode)
- [getFeeData](#getfeedata)
- [getGasPrice](#getgasprice)
- [getLogs](#getlogs)
- [getLogsDecoded](#getlogsdecoded)
- [getNetwork](#getnetwork)
- [getProvider](#getprovider)
- [getResolver](#getresolver)
- [getStorageAt](#getstorageat)
- [getTransaction](#gettransaction)
- [getTransactionCount](#gettransactioncount)
- [getTransactionReceipt](#gettransactionreceipt)
- [getTransactions](#gettransactions)
- [lookupAddress](#lookupaddress)
- [resolveName](#resolvename)
- [sendTransaction](#sendtransaction)
- [waitForTransaction](#waitfortransaction)

## Constructors

### constructor

• **new MultichainProviders**(`chainId?`, `urlOrKey?`, `type?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId?` | `number` |
| `urlOrKey?` | `string` |
| `type?` | `string` |

#### Defined in

MultichainProviders.ts:19

## Properties

### chainIdDefault

• **chainIdDefault**: `number` = `1`

#### Defined in

MultichainProviders.ts:13

___

### getNonce

• **getNonce**: (`chainId`: `number`, `address`: `string`) => `Promise`<`number`\>

#### Type declaration

▸ (`chainId`, `address`): `Promise`<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `address` | `string` |

##### Returns

`Promise`<`number`\>

#### Defined in

MultichainProviders.ts:110

___

### providers

• **providers**: `ProviderList` = `{}`

#### Defined in

MultichainProviders.ts:14

## Methods

### call

▸ **call**(`chainId`, `transaction`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `transaction` | `any` |

#### Returns

`Promise`<`string`\>

#### Defined in

MultichainProviders.ts:158

___

### connect

▸ **connect**(`chainId`, `urlOrKey`, `type?`): `void` \| `Provider`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `chainId` | `number` | `undefined` |
| `urlOrKey` | `string` | `undefined` |
| `type` | `string` | `'jsonrpc'` |

#### Returns

`void` \| `Provider`

#### Defined in

MultichainProviders.ts:31

___

### estimateGas

▸ **estimateGas**(`chainId`, `transaction`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `transaction` | `any` |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

MultichainProviders.ts:162

___

### getBalance

▸ **getBalance**(`chainId`, `address`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `address` | `string` |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

MultichainProviders.ts:94

___

### getBlock

▸ **getBlock**(`chainId`, `block`): `Promise`<`Block`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `block` | `number` |

#### Returns

`Promise`<`Block`\>

#### Defined in

MultichainProviders.ts:113

___

### getBlockNumber

▸ **getBlockNumber**(`chainId`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |

#### Returns

`Promise`<`number`\>

#### Defined in

MultichainProviders.ts:145

___

### getBlockWithTransactions

▸ **getBlockWithTransactions**(`chainId`, `block`): `Promise`<`Block`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `block` | `number` |

#### Returns

`Promise`<`Block`\>

#### Defined in

MultichainProviders.ts:117

___

### getCode

▸ **getCode**(`chainId`, `address`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `address` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

MultichainProviders.ts:98

___

### getFeeData

▸ **getFeeData**(`chainId`): `Promise`<`FeeData`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |

#### Returns

`Promise`<`FeeData`\>

#### Defined in

MultichainProviders.ts:153

___

### getGasPrice

▸ **getGasPrice**(`chainId`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

MultichainProviders.ts:149

___

### getLogs

▸ **getLogs**(`chainId`, `filter`): `Promise`<`Log`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `filter` | `Filter` |

#### Returns

`Promise`<`Log`[]\>

#### Defined in

MultichainProviders.ts:136

___

### getLogsDecoded

▸ **getLogsDecoded**(`chainId`, `contractInterface`, `filter`, `fragment`): `Promise`<{ `log`: `Log` = eventLog; `parsed`: `Result`  }[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `contractInterface` | `Interface` |
| `filter` | `Filter` |
| `fragment` | `EventFragment` |

#### Returns

`Promise`<{ `log`: `Log` = eventLog; `parsed`: `Result`  }[]\>

#### Defined in

MultichainProviders.ts:64

___

### getNetwork

▸ **getNetwork**(`chainId`): `Promise`<`Network`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |

#### Returns

`Promise`<`Network`\>

#### Defined in

MultichainProviders.ts:141

___

### getProvider

▸ **getProvider**(`chainId`): `Provider`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |

#### Returns

`Provider`

#### Defined in

MultichainProviders.ts:57

___

### getResolver

▸ **getResolver**(`chainId`, `name`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `name` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

MultichainProviders.ts:122

___

### getStorageAt

▸ **getStorageAt**(`chainId`, `address`, `position`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `address` | `string` |
| `position` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

MultichainProviders.ts:102

___

### getTransaction

▸ **getTransaction**(`chainId`, `hash`): `Promise`<`TransactionResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `hash` | `string` |

#### Returns

`Promise`<`TransactionResponse`\>

#### Defined in

MultichainProviders.ts:166

___

### getTransactionCount

▸ **getTransactionCount**(`chainId`, `address`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `address` | `string` |

#### Returns

`Promise`<`number`\>

#### Defined in

MultichainProviders.ts:106

___

### getTransactionReceipt

▸ **getTransactionReceipt**(`chainId`, `hash`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `hash` | `string` |

#### Returns

`Promise`<`TransactionReceipt`\>

#### Defined in

MultichainProviders.ts:170

___

### getTransactions

▸ **getTransactions**(`chainId`, `address`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `address` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

MultichainProviders.ts:80

___

### lookupAddress

▸ **lookupAddress**(`chainId`, `name`): `Promise`<``null`` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `name` | `string` |

#### Returns

`Promise`<``null`` \| `string`\>

#### Defined in

MultichainProviders.ts:127

___

### resolveName

▸ **resolveName**(`chainId`, `name`): `Promise`<``null`` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `name` | `string` |

#### Returns

`Promise`<``null`` \| `string`\>

#### Defined in

MultichainProviders.ts:131

___

### sendTransaction

▸ **sendTransaction**(`chainId`, `transaction`): `Promise`<`TransactionResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `transaction` | `any` |

#### Returns

`Promise`<`TransactionResponse`\>

#### Defined in

MultichainProviders.ts:174

___

### waitForTransaction

▸ **waitForTransaction**(`chainId`, `hash`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `hash` | `string` |

#### Returns

`Promise`<`TransactionReceipt`\>

#### Defined in

MultichainProviders.ts:178
