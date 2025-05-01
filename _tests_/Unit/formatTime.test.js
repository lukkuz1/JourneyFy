// __tests__/formatTime.test.js
import { formatTime } from "../../src/utils/formatTime";

describe('formatTime util', () => {
  beforeAll(() => {
    // Freeze system time for fallback tests
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2021-03-14T03:04:00Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('formats a morning timestamp correctly (AM)', () => {
    const ts = { toDate: () => new Date('2021-01-01T09:05:00') };
    expect(formatTime(ts)).toBe('09:05 AM');
  });

  it('formats an afternoon timestamp correctly (PM)', () => {
    const ts = { toDate: () => new Date('2021-01-01T15:07:00') };
    expect(formatTime(ts)).toBe('03:07 PM');
  });

  it('renders midnight as 12:00 AM', () => {
    const ts = { toDate: () => new Date('2021-01-01T00:00:00') };
    expect(formatTime(ts)).toBe('12:00 AM');
  });

  it('renders noon as 12:00 PM', () => {
    const ts = { toDate: () => new Date('2021-01-01T12:00:00') };
    expect(formatTime(ts)).toBe('12:00 PM');
  });

  it('pads single‐digit hours and minutes', () => {
    const ts = { toDate: () => new Date('2021-01-01T04:03:00') };
    expect(formatTime(ts)).toBe('04:03 AM');
  });

  it('falls back to current date when timestamp is undefined', () => {
    // our fake “now” is 03:04 AM UTC
    expect(formatTime(undefined)).toBe('03:04 AM');
  });
});
