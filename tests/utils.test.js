'use strict';

const { paginateArray } = require('../src/lib/pagination');
const { validateBody } = require('../src/lib/validators');

describe('pagination utilities', () => {
  test('paginateArray slices items and returns pageInfo', () => {
    const items = Array.from({ length: 25 }, (_, i) => i + 1);
    const { items: pageItems, pageInfo } = paginateArray(items, 2, 10);

    expect(pageItems).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    expect(pageInfo.page).toBe(2);
    expect(pageInfo.total).toBe(25);
    expect(pageInfo.totalPages).toBe(3);
    expect(pageInfo.hasNext).toBe(true);
    expect(pageInfo.hasPrev).toBe(true);
  });
});

describe('validators', () => {
  test('validateBody throws on missing required fields', () => {
    expect(() =>
      validateBody('person-data', {
        // url missing
      })
    ).toThrow(/Missing required field "url"/);
  });

  test('validateBody allows endpoints without schema', () => {
    expect(() => validateBody('non-existent-endpoint', {})).not.toThrow();
  });
});