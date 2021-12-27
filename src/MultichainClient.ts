import {
  InfuraProvider,
  JsonRpcProvider,
  Provider,
} from '@ethersproject/providers';

interface ProviderList {
  [key: string]: Provider;
}

class MultichainClient {
  chainIdDefault: number = 1;
  providers: ProviderList = {};

  constructor() {
    return this;
  }

  connect(
    chainId: number,
    urlOrKey: string,
    type: string = 'jsonrpc'
  ): Provider | void {
    let provider;
    switch (type) {
      case 'jsonrpc':
        provider = new JsonRpcProvider(urlOrKey);
        this.providers[chainId] = provider;
        break;
      case 'infura':
        provider = new InfuraProvider(chainId, urlOrKey);
        this.providers[chainId] = provider;
        break;
      default:
        break;
    }
    return provider;
  }

  getProvider(chainId: number): Provider | void {
    return this.providers[chainId];
  }
}

export default MultichainClient;
