import { Interface } from '@ethersproject/abi';
import { MultichainProviders } from '../src';
import Contract from './abi/PrizeDistributor.json';

const apikey = process.env.INFURA_API_KEY || '';

describe('getLogs', () => {
  it('should fetch event logs', async () => {
    let client = new MultichainProviders();
    client.connect(1, apikey, 'infura');
    const contract = new Interface(Contract.abi);
    const filter = {
      fromBlock: 14000122,
      toBlock: 14010122,
      address: '0xb9a179DcA5a7bf5f8B9E088437B3A85ebB495eFe',
      topics: [contract.events['ClaimedDraw']],
    };
    // @ts-ignore
    const events = await client.getLogs(1, filter);
    expect(events.length).toBeGreaterThan(0);
  });

  it('should fetch parsed event logs', async () => {
    let client = new MultichainProviders();
    client.connect(1, apikey, 'infura');
    const contract = new Interface(Contract.abi);
    const filter = {
      fromBlock: 14000122,
      toBlock: 14010122,
      address: '0xb9a179DcA5a7bf5f8B9E088437B3A85ebB495eFe',
      topics: [contract.events['ClaimedDraw']],
    };

    const events = await client.getLogsDecoded(
      1,
      // @ts-ignore
      filter,
      contract,
      contract.events['ClaimedDraw(address,uint32,uint256)']
    );

    expect(events.length).toBeGreaterThan(0);
  });
});
