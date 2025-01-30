import { startOfDay } from 'date-fns';

export const getStartOfDate = (date: Date) => {
  return startOfDay(date);
};
