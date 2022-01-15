import { MultichainProviders } from '../src';

describe('MultichainProviders', () => {
  it('should succesfully initialize the MultichainProviders class', () => {
    let client = new MultichainProviders();
    expect(client.providers[1]).toBeTruthy();
  });
});
