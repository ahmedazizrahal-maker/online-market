const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

function adminAuth(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// GET /api/admin/products
router.get('/products', adminAuth, async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// POST /api/admin/add-product
router.post('/add-product', adminAuth, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid product data' });
  }
});

// PUT /api/admin/update-product/:id
router.put('/update-product/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Update failed' });
  }
});

// DELETE /api/admin/delete-product/:id
router.delete('/delete-product/:id', adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Delete failed' });
  }
});

module.exports = router;