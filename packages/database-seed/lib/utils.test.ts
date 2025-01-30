import { isBefore } from 'date-fns';
import { getDateStatus, getToFromDate, isBetween } from './utils';

describe('Dates', () => {
  test('should getToFromDate', () => {
    const { from, to } = getToFromDate();
    console.log(from, to);
    expect(from.getTime()).toBeLessThan(to.getTime());
    expect(isBefore(from, to)).toBe(true);
  });

  describe('getDateStatus', () => {
    test('should return "before" for dates before the range', () => {
      const { from, to } = getToFromDate();
      const date = new Date(from.getTime() - 1000); // 1 second before 'from'
      expect(getDateStatus(date, { from, to })).toBe('before');
    });

    test('should return "after" for dates after the range', () => {
      const { from, to } = getToFromDate();
      const date = new Date(to.getTime() + 1000); // 1 second after 'to'
      expect(getDateStatus(date, { from, to })).toBe('after');
    });

    test('should return "between" for dates within the range', () => {
      const { from, to } = getToFromDate();
      const date = new Date((from.getTime() + to.getTime()) / 2); // midpoint between 'from' and 'to'
      expect(getDateStatus(date, { from, to })).toBe('between');
    });
  });

  describe('isBetween', () => {
    test('should return true for dates within the range', () => {
      const { from, to } = getToFromDate();
      const date = new Date((from.getTime() + to.getTime()) / 2); // midpoint between 'from' and 'to'
      expect(isBetween(date, { from, to })).toBe(true);
    });

    test('should return false for dates before the range', () => {
      const { from, to } = getToFromDate();
      const date = new Date(from.getTime() - 1000); // 1 second before 'from'
      expect(isBetween(date, { from, to })).toBe(false);
    });

    test('should return false for dates after the range', () => {
      const { from, to } = getToFromDate();
      const date = new Date(to.getTime() + 1000); // 1 second after 'to'
      expect(isBetween(date, { from, to })).toBe(false);
    });
  });
});
