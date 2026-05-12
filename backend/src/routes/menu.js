const express = require('express');
const { 
  getMenuItems, 
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem 
} = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getMenuItems)
  .post(protect, authorize('admin', 'manager'), createMenuItem);

router.route('/:id')
  .put(protect, authorize('admin', 'manager'), updateMenuItem)
  .delete(protect, authorize('admin', 'manager'), deleteMenuItem);

module.exports = router;
