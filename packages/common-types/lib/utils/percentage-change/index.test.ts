import { percentageChange, percentageChangeDisplay } from '.';

describe('PercentageChange', () => {
  test('should work on standard vals', () => {
    const res = percentageChange(100, 120);
    expect(res).toBe(20);
  });
  test('should work on 0 vals', () => {
    const res = percentageChange(0, 0);
    expect(res).toBe(0);

    const res2 = percentageChange(0, 1);
    expect(res2).toBe(100);

    const res3 = percentageChange(1, 0);
    expect(res3).toBe(-100);
  });
  describe('percentageChangeDisplay', () => {
    test('should display percentage', () => {
      const res = percentageChangeDisplay(100, 120);
      expect(res).toBe('20%');
      const res2 = percentageChangeDisplay(111, 158);

      expect(res2).toBe('42.3%');
    });
    test('should format number correctly', () => {
      const res = percentageChangeDisplay(0, 10);
      expect(res).toBe('1,000%');
    });
    test('should display prefix', () => {
      const res = percentageChangeDisplay(100, 120, { prefix: true });
      expect(res).toBe('+20%');
    });
  });
});
