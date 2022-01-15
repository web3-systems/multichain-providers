import { MultichainProviders } from '../src';

const apikey = process.env.ETHERSCAN_API_KEY || '';

describe('getTransactions', () => {
  it('should succesfully fetch transactions history from Chainscan(Etherscan) endpoint', async () => {
    let client = new MultichainProviders(1, apikey, 'chainscan');
    const transactions = await client.getTransactions(
      1,
      '0xd24fa211e03E82873980296D11f0318BdD329fbd'
    );
    expect(transactions.length).toBeGreaterThan(0);
  });
});
