import { formatDistance } from 'date-fns';

export const formatDateRelative = (date: Date, now = new Date()) => {
  const distance = formatDistance(date, now);
  return distance;
};
