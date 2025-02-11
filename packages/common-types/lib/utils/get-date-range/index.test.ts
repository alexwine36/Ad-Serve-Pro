import { subDays } from 'date-fns';
import { describe, expect, it } from 'vitest';
import { getComparisonDateRanges, getDateRange } from './index';

describe('getDateRange', () => {
  it('should return the correct date range for the default parameters', () => {
    const endDate = new Date();
    const startDate = subDays(endDate, 30);
    const result = getDateRange();
    expect(result.endDate.getTime() / 100).toBeCloseTo(
      endDate.getTime() / 100,
      1
    );
    expect(result.startDate.getTime() / 100).toBeCloseTo(
      startDate.getTime() / 100,
      1
    );
  });

  it('should return the correct date range for custom parameters', () => {
    const endDate = new Date('2023-10-01');
    const days = 10;
    const startDate = subDays(endDate, days);
    const result = getDateRange(days, endDate);
    expect(result).toEqual({ startDate, endDate });
  });
});

describe('getComparisonDateRanges', () => {
  it.skip('should return the correct comparison date ranges for the default parameters', () => {
    const endDate = new Date();
    const currentStartDate = subDays(endDate, 30);
    const previousStartDate = subDays(currentStartDate, 30);
    const result = getComparisonDateRanges();
    expect(result).toEqual({
      current: { startDate: currentStartDate, endDate },
      previous: { startDate: previousStartDate, endDate: currentStartDate },
    });
  });

  it('should return the correct comparison date ranges for custom parameters', () => {
    const endDate = new Date('2023-10-01');
    const days = 10;
    const currentStartDate = subDays(endDate, days);
    const previousStartDate = subDays(currentStartDate, days);
    const result = getComparisonDateRanges(days, endDate);
    expect(result).toEqual({
      current: { startDate: currentStartDate, endDate },
      previous: { startDate: previousStartDate, endDate: currentStartDate },
    });
  });
});
