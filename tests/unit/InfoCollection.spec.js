import { roundingLatLong, formatPopulation, fetchTimezone } from '../../src/components/InfoCollection.vue';

describe('formatPopulation function', () => {
  test('should convert 7 digit population to a formatted version', () => {
    const result = formatPopulation('1000000');
    expect(result).toBe('1,000,000');
  });
  test('should keep 3 digit population the same', () => {
    const result = formatPopulation('100');
    expect(result).toBe('100');
  });
  test('should convert 4 digit population to a formatted version', () => {
    const result = formatPopulation('1000');
    expect(result).toBe('1,000');
  });
  test('should convert 9 digit population to a formatted version', () => {
    const result = formatPopulation('100000000');
    expect(result).toBe('100,000,000');
  });
});
describe('roundingLatLong function', () => {
  test('rounds negative values two digits after decimal', () => {
      const result = roundingLatLong([-3.433333, 29.93333]);
      expect(result).toBe('-3.43, 29.93')
  });
  test('rounds positive values two digits after decimal', () => {
      const result = roundingLatLong([3.433333, 29.93333]);
      expect(result).toBe('3.43, 29.93')
  });
  test('doesnt round whole numbers', () => {
      const result = roundingLatLong([3, 29]);
      expect(result).toBe('3, 29')
  });
  test('doesnt take more than two values', () => {
      const result = roundingLatLong([3, 29, 45]);
      expect(result).toBe('3, 29')
  });
});
describe('fetchTimezone function', () => {
  test('format UTC into UTC 0', () => {
      const result = fetchTimezone('UTC');
      expect(result).toBe('UTC+0:00')
  });
  test('do not change if has numbers after UTC (positive)', () => {
    const result = fetchTimezone('UTC+1:00');
    expect(result).toBe('UTC+1:00')
  });
  test('do not change if has numbers after UTC (negative)', () => {
    const result = fetchTimezone('UTC-1:00');
    expect(result).toBe('UTC-1:00')
  });
});