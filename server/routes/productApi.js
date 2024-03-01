const express = require('express');
const router = express.Router();
const { getAll, getNearestPrices } = require('../services/product');
const { handleAsync } = require('../utils/methods');

const DEFAULT_PAGE_SIZE = 24;
const NEAREST_PRICED_PRODUCTS_COUNT = 5;

const parsePagination = (req, _, next) => {
  req.query.page = parseInt(req.query.page) || 1;
  req.query.perPage = parseInt(req.query.perPage) || DEFAULT_PAGE_SIZE;
  next();
};

router.get(
  '/api/products',
  parsePagination,
  handleAsync(async (req, res) => {
    const { category, minPrice, maxPrice, page, perPage } = req.query;

    const filters = {
      category,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      page,
      perPage,
    };

    const result = await getAll(filters);
    res.status(200).json(result);
  })
);

router.get(
  '/api/products/:productId/nearest-prices',
  parsePagination,
  handleAsync(async (req, res) => {
    const { productId } = req.params;
    const { page, perPage, n = NEAREST_PRICED_PRODUCTS_COUNT } = req.query;
    const result = await getNearestPrices(productId, n, page, perPage);
    res.status(200).json(result);
  })
);

module.exports = router;
