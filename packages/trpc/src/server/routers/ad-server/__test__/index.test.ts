import { getTestCaller } from '../../../../utils/test-utils';

describe('AdServer', () => {
  describe('get ads', () => {
    test('should return empty ads array without correct org id', async () => {
      const trpc = await getTestCaller('guest');
      const res = await trpc.adServer.getAds({
        organizationId: '',
      });
      console.log(res);
      expect(res.length).toBe(0);
    });
    test.todo('should return ads for orgs', async () => {
      const trpc = await getTestCaller('guest');
      const res = await trpc.adServer.getAds({
        organizationId: 'org-id',
      });
      console.log(res);
    });
  });
});
