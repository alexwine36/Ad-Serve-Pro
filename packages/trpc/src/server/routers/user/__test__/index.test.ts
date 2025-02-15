import { getTestCaller } from '../../../../utils/test-utils';

describe('User', () => {
  describe('me', () => {
    test('should return error if guest', async () => {
      const trpc = await getTestCaller('guest');
      await expect(() => trpc.user.me({})).rejects.toThrowError();
    });
    test('should return user if user', async () => {
      const trpc = await getTestCaller('user');
      const res = await trpc.user.me({});
      expect(res).toBeTruthy();
    });
  });
});
