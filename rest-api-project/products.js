const express = require('express');
const router = express.Router();
const auth = require('./middleware/auth');
const validateProduct = require('./middleware/validateProduct');

let products = [];
let idCounter = 1;

// Apply auth middleware to all routes
router.use(auth);

// GET /api/products
router.get('/', (req, res) => {
  let filteredProducts = products;

  // Filter by category
  if (req.query.category) {
    filteredProducts = filteredProducts.filter(
      p => p.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }

  // Pagination logic
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    total: filteredProducts.length,
    data: paginatedProducts,
  });
});


// GET /api/products/:id
router.get('/:id', (req, res, next) => {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
  } catch (err) {
    next(err);
  }
});


// POST /api/products
router.post('/', validateProduct, (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = {
      id: idCounter++,
      name,
      description,
      price,
      category,
      inStock,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});


// PUT /api/products/:id
router.put('/:id', validateProduct, (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      // Product not found, throw custom error
      throw new NotFoundError('Product not found');
    }

    const { name, description, price, category, inStock } = req.body;

    // Update product
    products[productIndex] = { id: productId, name, description, price, category, inStock };

    res.json(products[productIndex]);
  } catch (err) {
    // Pass error to error handling middleware
    next(err);
  }
});


// DELETE /api/products/:id
router.delete('/:id', (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      throw new NotFoundError('Product not found');
    }

    // Remove product from array
    products.splice(productIndex, 1);

    res.status(204).send(); // No content
  } catch (err) {
    next(err);
  }
});


module.exports = router;

const NotFoundError = require('./errors/NotFoundError');
const ValidationError = require('./errors/ValidationError');

router.get('/search', (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'Please provide a name to search' });
  }

  const results = products.filter(p =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json(results);
});

router.get('/stats/category-count', (req, res) => {
  const stats = {};

  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });

  res.json(stats);
});

