const express = require('express');
const router = express.Router();
const { getProducts } = require('../services/product');
const handleAsync = require('../utils/handleAsync');

const DEFAULT_PAGE_SIZE = 24;

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

    const result = await getProducts(filters);
    res.status(200).json(result);
  })
);

module.exports = router;
