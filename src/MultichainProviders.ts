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
    if (chainId && urlOrKey) {this.connect(chainId, urlOrKey, type);} else {
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
    contractInterface: Interface,
    filter: Filter,
    fragment: EventFragment
  ) {
    return (await this.getProvider(chainId).getLogs(filter)).map(eventLog => ({
      log: eventLog,
      parsed: contractInterface.decodeEventLog(
        fragment,
        eventLog.data,
        eventLog.topics
      ),
    }));
  }

  async getTransactions(chainId: number, address: string) {
    const etherscanProvider = this.getProvider(chainId);
    if(etherscanProvider.constructor.name != 'EtherscanProvider') {
      throw new Error('getTransactions: Requires valid EtherscanProvider');
    }
    // @ts-ignore - getHistory exists on the provider but is not in the type definition
    return etherscanProvider.getHistory(address);
  }

  /* -------------------------------------------------- */
  // Ethers Wrappers
  /* -------------------------------------------------- */

  // Account Methods (https://docs.ethers.io/v5/api/providers/provider/#Provider--account-methods)
  async getBalance(chainId: number, address: string) {
    return this.getProvider(chainId).getBalance(address);
  }

  async getCode(chainId: number, address: string) {
    return this.getProvider(chainId).getCode(address);
  }

  async getStorageAt(chainId: number, address: string, position: string) {
    return this.getProvider(chainId).getStorageAt(address, position);
  }

  async getTransactionCount(chainId: number, address: string) {
    return this.getProvider(chainId).getTransactionCount(address);
  }

  getNonce = this.getTransactionCount;

  // Block Methods (https://docs.ethers.io/v5/api/providers/provider/#Provider--block-methods)
  async getBlock(chainId: number, block: number) {
    return this.getProvider(chainId).getBlock(block);
  }

  async getBlockWithTransactions(chainId: number, block: number) {
    return this.getProvider(chainId).getBlock(block);
  }

  // ENS Methods (https://docs.ethers.io/v5/api/providers/provider/#Provider--ens-methods)
  async getResolver(chainId: number, name: string) {
    // @ts-ignore - getResolver is not in the type definition but SHOULD be
    return this.getProvider(chainId).getResolver(name);
  }

  async lookupAddress(chainId: number, name: string) {
    return this.getProvider(chainId).lookupAddress(name);
  }

  async resolveName(chainId: number, name: string) {
    return this.getProvider(chainId).resolveName(name);
  }

  // Logs Methods (https://docs.ethers.io/v5/api/providers/provider/#Provider--log-methods)
  async getLogs(chainId: number, filter: Filter) {
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
  async call(chainId: number, transaction: any) {
    return this.getProvider(chainId).call(transaction);
  }

  async estimateGas(chainId: number, transaction: any) {
    return this.getProvider(chainId).estimateGas(transaction);
  }

  async getTransaction(chainId: number, hash: string) {
    return this.getProvider(chainId).getTransaction(hash);
  }

  async getTransactionReceipt(chainId: number, hash: string) {
    return this.getProvider(chainId).getTransactionReceipt(hash);
  }

  async sendTransaction(chainId: number, transaction: any) {
    return this.getProvider(chainId).sendTransaction(transaction);
  }

  async waitForTransaction(chainId: number, hash: string) {
    return this.getProvider(chainId).waitForTransaction(hash);
  }
}

export default MultichainProviders;
