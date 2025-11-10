'use strict';

const { validateBody } = require('../lib/validators');
const { paginateArray } = require('../lib/pagination');
const { formatSuggestion } = require('../lib/linkedin-formatters');

function buildSuggestions(query, total = 10) {
  const base = query || 'Industry';
  const items = [];
  for (let i = 0; i < total; i += 1) {
    const name = `${base} Industry ${i + 1}`;
    items.push(
      formatSuggestion({
        endpoint: 'suggestion-industry',
        suggestionType: 'industry',
        suggestionQuery: query,
        suggestedName: name,
        suggestedId: 4000 + i,
      })
    );
  }
  return items;
}

module.exports = async function suggestionIndustry(body, context = {}) {
  const { logger, defaults } = context;
  validateBody('suggestion-industry', body);

  const query = body.suggestionQuery || body.query || '';
  const requestedPage = body.page || 1;
  const pageSize = defaults.pageSize || 10;

  const suggestions = buildSuggestions(query, 30);
  const { items, pageInfo } = paginateArray(suggestions, requestedPage, pageSize);

  if (logger && logger.info) {
    logger.info(
      `suggestion-industry for query="${query}" returned page ${pageInfo.page}/${pageInfo.totalPages} (${items.length} suggestions).`
    );
  }

  return items.map((item) => ({
    ...item,
    page: pageInfo.page,
  }));
};