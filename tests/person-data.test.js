'use strict';

const { runScraper } = require('../src/main');

describe('person-data endpoint', () => {
  jest.setTimeout(10000);

  test('returns a normalized person profile', async () => {
    const url = 'https://www.linkedin.com/in/john-doe';
    const result = await runScraper({
      endpoint: 'person-data',
      body: { url },
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);

    const profile = result[0];
    expect(profile.endpoint).toBe('person-data');
    expect(profile.url).toBe(url);
    expect(typeof profile.fullName).toBe('string');
    expect(profile.fullName.toLowerCase()).toContain('john');
    expect(profile.currentPositions).toBeInstanceOf(Array);
  });
});