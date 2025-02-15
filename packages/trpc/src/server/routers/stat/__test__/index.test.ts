import { getTestCaller } from '../../../../utils/test-utils';

describe('Stat', () => {
  describe('Ad Analytics', () => {
    test('should allow guest', async () => {
      const trpc = await getTestCaller('guest');
      const res = await trpc.stat.adAnalytics({
        includeAll: true,
      });
      expect(res).toBeTruthy();
    });
  });
});
