import { faker } from '@faker-js/faker';
import { PrismaClient } from '../../../../../../database';
import { getTestCaller } from '../../../../utils/test-utils';

describe('Organization', () => {
  describe('create', () => {
    test('should create organization', async () => {
      const trpc = await getTestCaller('create');
      const currentUser = await trpc.user.me({});

      expect(currentUser).toBeTruthy();
      expect(currentUser?.currentOrganizationId).toBeNull();
      const res = await trpc.organization.create({
        name: faker.company.name(),
        image: faker.image.avatar(),
      });
      expect(res).toBeTruthy();

      const prisma = new PrismaClient();
      const updatedUser = await prisma.user.findFirst({
        where: {
          email: currentUser?.email,
        },
      });
      expect(updatedUser?.currentOrganizationId).toBe(res.id);
    });
  });
  describe('get-all', () => {
    test('should return organizations for org-user', async () => {
      const trpc = await getTestCaller('org-admin');
      const res = await trpc.organization.getAll({});
      expect(res).toBeTruthy();
      expect(res.length).toBeGreaterThan(0);
    });
  });
});
