import { subDays } from 'date-fns';

export const getDateRange = (days = 30, endDate = new Date()) => {
  const startDate = subDays(endDate, days);
  return { startDate, endDate };
};

export const getComparisonDateRanges = (days = 30, endDate = new Date()) => {
  const current = getDateRange(days, endDate);
  return { current, previous: getDateRange(days, current.startDate) };
};
