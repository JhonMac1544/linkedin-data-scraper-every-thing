'use strict';

const { runScraper } = require('../src/main');

describe('search-jobs endpoint', () => {
  jest.setTimeout(10000);

  test('returns paginated job results', async () => {
    const query = 'Senior Engineer';
    const result = await runScraper({
      endpoint: 'search-jobs',
      body: {
        searchQuery: query,
        page: 1,
      },
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    const job = result[0];
    expect(job.endpoint).toBe('search-jobs');
    expect(job.searchQuery).toBe(query);
    expect(typeof job.jobTitle).toBe('string');
    expect(job.page).toBe(1);
  });
});