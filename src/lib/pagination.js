'use strict';

function paginateArray(items, page = 1, perPage = 20) {
  const safePerPage = Math.max(1, perPage);
  const total = Array.isArray(items) ? items.length : 0;
  const totalPages = Math.max(1, Math.ceil(total / safePerPage));

  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * safePerPage;
  const end = start + safePerPage;
  const slice = items.slice(start, end);

  const pageInfo = {
    page: currentPage,
    perPage: safePerPage,
    total,
    totalPages,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };

  return { items: slice, pageInfo };
}

module.exports = {
  paginateArray,
};