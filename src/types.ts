import { Provider } from '@ethersproject/providers';

export interface ProviderList {
  [key: string]: Provider;
}
