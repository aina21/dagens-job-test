const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const products = require('../db.js');
const { v4: uuidv4 } = require('uuid');
const { paginate } = require('../utils/methods');
const { get } = require('../routes/productApi.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const create = async (productData) => {
  const newProduct = {
    id: uuidv4(),
    ...productData,
  };

  return newProduct;
};

const getAll = async ({ category, minPrice, maxPrice, page, perPage }) => {
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

  return paginate(filteredProducts, page, perPage);
};

const getId = async (productId) => {
  return products.find((product) => product.id === productId);
};

const getNearestPrices = async (productId, n, page, perPage) => {
  const targetProduct = await getId(productId);

  if (!targetProduct)
    return {
      products: [],
      total: 0,
    };

  const otherProductsInSameCategory = products.filter(
    (product) =>
      product.category === targetProduct.category && product.id !== productId
  );

  const nearestProducts = otherProductsInSameCategory
    .sort(
      (a, b) =>
        Math.abs(a.price - targetProduct.price) -
        Math.abs(b.price - targetProduct.price)
    )
    .slice(0, n);

  return paginate(nearestProducts, page, perPage);
};

module.exports = { create, getAll, getNearestPrices };
