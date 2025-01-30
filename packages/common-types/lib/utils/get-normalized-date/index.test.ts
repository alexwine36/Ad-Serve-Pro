import { getStartOfDate } from '.';

describe('GetNormalizedDate', () => {
  test('getStartOfDate should return start of the day for a given date', () => {
    const date = new Date('2023-10-10T15:00:00Z');
    const startOfDate = getStartOfDate(date);
    expect(startOfDate.getDate()).toEqual(date.getDate());
    expect(startOfDate.getMinutes()).toEqual(0);
    expect(startOfDate.getSeconds()).toEqual(0);
  });
});
