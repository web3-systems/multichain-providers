import { EventFragment, Interface } from '@ethersproject/abi';
import {
  EtherscanProvider,
  Filter,
  getDefaultProvider,
  InfuraProvider,
  JsonRpcProvider,
  Provider,
} from '@ethersproject/providers';
import { ProviderList } from './types';

class MultichainProviders {
  chainIdDefault: number = 1;
  providers: ProviderList = {};

  /* -------------------------------------------------- */
  // Constructor
  /* -------------------------------------------------- */
  constructor(chainId?: number, urlOrKey?: string, type?: string) {
    if (chainId) this.chainIdDefault = chainId;
    if (chainId && urlOrKey) {
      this.connect(chainId, urlOrKey, type);
    } else {
      this.providers[this.chainIdDefault] = getDefaultProvider();
    }
    return this;
  }

  /* -------------------------------------------------- */
  // Class Methods
  /* -------------------------------------------------- */

  connect(
    chainId: number,
    urlOrKey: string,
    type: string = 'jsonrpc'
  ): Provider | void {
    let provider;
    if (!chainId || !urlOrKey) return;
    switch (type) {
      case 'jsonrpc':
        provider = new JsonRpcProvider(urlOrKey);
        this.providers[chainId] = provider;
        break;
      case 'infura':
        provider = new InfuraProvider(chainId, urlOrKey);
        this.providers[chainId] = provider;
        break;
      case 'etherscan':
      case 'chainscan':
        provider = new EtherscanProvider(chainId, urlOrKey);
        this.providers[chainId] = provider;
        break;
      default:
        break;
    }
    return provider;
  }

  getProvider(chainId: number): Provider {
    return this.providers[chainId];
  }

  /* -------------------------------------------------- */
  // Utility Methods
  /* -------------------------------------------------- */
  async getLogsDecoded(
    chainId: number,
    filter: Filter,
    interface_: Interface,
    fragment: EventFragment
  ) {
    return (await this.getProvider(chainId).getLogs(filter)).map(eventLog => ({
      log: eventLog,
      parsed: interface_.decodeEventLog(
        fragment,
        eventLog.data,
        eventLog.topics
      ),
    }));
  }

  async getTransactions(chainId: number, address: string) {
    const etherscanProvider = this.getProvider(chainId);
    if (etherscanProvider.constructor.name !== 'EtherscanProvider') {
      throw new Error('getTransactions: Requires valid EtherscanProvider');
    }
    // @ts-ignore - getHistory exists on the provider but is not in the type definition
    return etherscanProvider.getHistory(address);
  }

  /* -------------------------------------------------- */
  // Ethers Provider Function Wrapping
  /* -------------------------------------------------- */

  // Account Methods (https://docs.ethers.io/v5/api/providers/provider/#Provider--account-methods)
  async getBalance(address: string, chainId: number) {
    return this.getProvider(chainId).getBalance(address);
  }

  async getCode(address: string, chainId: number) {
    return this.getProvider(chainId).getCode(address);
  }

  async getStorageAt(address: string, position: string, chainId: number) {
    return this.getProvider(chainId).getStorageAt(address, position);
  }

  async getTransactionCount(address: string, chainId: number) {
    return this.getProvider(chainId).getTransactionCount(address);
  }

  getNonce = this.getTransactionCount;

  // Block Methods (https://docs.ethers.io/v5/api/providers/provider/#Provider--block-methods)
  async getBlock(block: number, chainId: number) {
    return this.getProvider(chainId).getBlock(block);
  }

  async getBlockWithTransactions(block: number, chainId: number) {
    return this.getProvider(chainId).getBlock(block);
  }

  // ENS Methods (https://docs.ethers.io/v5/api/providers/provider/#Provider--ens-methods)
  async getResolver(name: string, chainId: number) {
    // @ts-ignore - getResolver is not in the type definition but SHOULD be
    return this.getProvider(chainId).getResolver(name);
  }

  async lookupAddress(name: string, chainId: number) {
    return this.getProvider(chainId).lookupAddress(name);
  }

  async resolveName(name: string, chainId: number) {
    return this.getProvider(chainId).resolveName(name);
  }

  // Logs Methods (https://docs.ethers.io/v5/api/providers/provider/#Provider--log-methods)
  async getLogs(filter: Filter, chainId: number) {
    return this.getProvider(chainId).getLogs(filter);
  }

  // Network Methods (https://docs.ethers.io/v5/api/providers/provider/#Provider--network-methods)
  async getNetwork(chainId: number) {
    return this.getProvider(chainId).getNetwork();
  }

  async getBlockNumber(chainId: number) {
    return this.getProvider(chainId).getBlockNumber();
  }

  async getGasPrice(chainId: number) {
    return this.getProvider(chainId).getGasPrice();
  }

  async getFeeData(chainId: number) {
    return this.getProvider(chainId).getFeeData();
  }

  // Transaction Methods (https://docs.ethers.io/v5/api/providers/provider/#Provider--transaction-methods)
  async call(transaction: any, chainId: number) {
    return this.getProvider(chainId).call(transaction);
  }

  async estimateGas(transaction: any, chainId: number) {
    return this.getProvider(chainId).estimateGas(transaction);
  }

  async getTransaction(hash: string, chainId: number) {
    return this.getProvider(chainId).getTransaction(hash);
  }

  async getTransactionReceipt(hash: string, chainId: number) {
    return this.getProvider(chainId).getTransactionReceipt(hash);
  }

  async sendTransaction(transaction: any, chainId: number) {
    return this.getProvider(chainId).sendTransaction(transaction);
  }

  async waitForTransaction(hash: string, chainId: number) {
    return this.getProvider(chainId).waitForTransaction(hash);
  }
}

export default MultichainProviders;
