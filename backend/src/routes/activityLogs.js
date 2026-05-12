const express = require('express');
const ActivityLog = require('../models/ActivityLog');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin', 'manager')); // Only management can see logs

router.get('/', async (req, res, next) => {
  try {
    const logs = await ActivityLog.find()
      .populate('staffId', 'name')
      .sort('-createdAt')
      .limit(50);
      
    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
