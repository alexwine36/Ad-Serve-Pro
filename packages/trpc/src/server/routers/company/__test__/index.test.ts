import { getTestCaller } from '../../../../utils/test-utils';

describe('Company', () => {
  describe('get-all', () => {
    test('should return error if guest', async () => {
      const trpc = await getTestCaller('guest');
      await expect(() => trpc.company.getAll({})).rejects.toThrowError();
    });
    test('should return error if user does not have org', async () => {
      const trpc = await getTestCaller('user');
      await expect(() => trpc.company.getAll({})).rejects.toThrowError();
    });
    test('should return companies for org-user', async () => {
      const trpc = await getTestCaller('org-admin');
      const res = await trpc.company.getAll({});
      expect(res).toBeTruthy();
    });
  });
});
