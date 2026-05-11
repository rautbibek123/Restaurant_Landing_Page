const express = require('express');
const { getMenuItems, createMenuItem } = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getMenuItems)
  .post(protect, authorize('admin', 'manager'), createMenuItem);

module.exports = router;
