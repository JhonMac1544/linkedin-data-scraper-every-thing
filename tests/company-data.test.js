'use strict';

const { runScraper } = require('../src/main');

describe('company-data endpoint', () => {
  jest.setTimeout(10000);

  test('returns a normalized company profile', async () => {
    const url = 'https://www.linkedin.com/company/example-company';
    const result = await runScraper({
      endpoint: 'company-data',
      body: { url },
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);

    const company = result[0];
    expect(company.endpoint).toBe('company-data');
    expect(company.url).toBe(url);
    expect(typeof company.companyName).toBe('string');
    expect(company.companyName.toLowerCase()).toContain('example');
    expect(typeof company.followersCount === 'number' || company.followersCount === null).toBe(
      true
    );
  });
});