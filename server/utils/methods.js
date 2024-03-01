const handleAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error('Internal server error:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
};

const paginate = (items, page, perPage) => {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    currentPage: page,
    totalPages: Math.ceil(items.length / perPage),
    total: items.length,
  };
};

module.exports = { handleAsync, paginate };
