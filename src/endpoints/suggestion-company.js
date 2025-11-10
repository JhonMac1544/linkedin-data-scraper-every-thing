'use strict';

const { validateBody } = require('../lib/validators');
const { paginateArray } = require('../lib/pagination');
const { formatSuggestion } = require('../lib/linkedin-formatters');

function buildSuggestions(query, total = 10) {
  const base = query || 'Company';
  const items = [];
  for (let i = 0; i < total; i += 1) {
    const name = `${base} Suggestion ${i + 1}`;
    items.push(
      formatSuggestion({
        endpoint: 'suggestion-company',
        suggestionType: 'company',
        suggestionQuery: query,
        suggestedName: name,
        suggestedId: 1000 + i,
      })
    );
  }
  return items;
}

module.exports = async function suggestionCompany(body, context = {}) {
  const { logger, defaults } = context;
  validateBody('suggestion-company', body);

  const query = body.suggestionQuery || body.query || '';
  const requestedPage = body.page || 1;
  const pageSize = defaults.pageSize || 10;

  const suggestions = buildSuggestions(query, 30);
  const { items, pageInfo } = paginateArray(suggestions, requestedPage, pageSize);

  if (logger && logger.info) {
    logger.info(
      `suggestion-company for query="${query}" returned page ${pageInfo.page}/${pageInfo.totalPages} (${items.length} suggestions).`
    );
  }

  return items.map((item) => ({
    ...item,
    page: pageInfo.page,
  }));
};