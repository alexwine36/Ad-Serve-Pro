import { generateMock } from '@anatine/zod-mock';
import { getTestCaller } from '../../../../utils/test-utils';
import { CompanyCreateSchema } from '../company-create-schema';
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
  describe('create', () => {
    test('should create company', async () => {
      const trpc = await getTestCaller('org-admin');
      const currentUser = await trpc.user.me({});

      expect(currentUser).toBeTruthy();
      expect(currentUser?.currentOrganizationId).not.toBeNull();
      const company = generateMock(CompanyCreateSchema);
      const res = await trpc.company.create(company);

      expect(res).toBeTruthy();
      const companies = await trpc.company.getAll({});
      expect(companies.length).toBeGreaterThan(0);
      expect(companies.find((c) => c.id === res.id)).toBeTruthy();

      const getCompany = await trpc.company.getOne({ id: res.id });
      expect(getCompany).toBeTruthy();
      expect(getCompany?.id).toBe(res.id);
      const getCompanySlug = await trpc.company.getOne({ slug: res.slug });
      expect(getCompanySlug).toBeTruthy();
      expect(getCompanySlug?.slug).toBe(res.slug);

      const getCompanyUnknownId = await trpc.company.getOne({
        unknown: res.id,
      });
      expect(getCompanyUnknownId).toBeTruthy();
      expect(getCompanyUnknownId?.id).toBe(res.id);
      const getCompanyUnknownSlug = await trpc.company.getOne({
        unknown: res.slug,
      });
      expect(getCompanyUnknownSlug).toBeTruthy();
      expect(getCompanyUnknownSlug?.slug).toBe(res.slug);
    });
  });
});
