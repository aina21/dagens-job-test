const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const products = require('../db.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const getProducts = async ({ category, minPrice, maxPrice, page, perPage }) => {
  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= maxPrice
    );
  }

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / perPage);

  return {
    products: paginatedProducts,
    currentPage: page,
    totalPages: totalPages,
    total: total,
  };
};

module.exports = { getProducts };
