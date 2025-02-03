import { BrowserFingerprint } from './fingerprinting';

describe('Fingerprinting', () => {
  test('should run fingerprinting script', async () => {
    const fingerprinter = new BrowserFingerprint();
    const res = await fingerprinter.generateFingerprint();

    console.log(res);
    console.log(await fingerprinter.gatherComponents());
  });
});
