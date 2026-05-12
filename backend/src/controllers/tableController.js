const Table = require('../models/Table');

// @desc    Get all tables
// @route   GET /api/tables
// @access  Private
exports.getTables = async (req, res, next) => {
  try {
    const tables = await Table.find().sort('number');
    res.status(200).json({
      success: true,
      count: tables.length,
      data: tables
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update table status
// @route   PUT /api/tables/:id
// @access  Private
exports.updateTable = async (req, res, next) => {
  try {
    const table = await Table.findOneAndUpdate(
      { number: req.params.number },
      req.body,
      { new: true, runValidators: true }
    );

    if (!table) {
      return res.status(404).json({ success: false, message: 'Table not found' });
    }

    res.status(200).json({ success: true, data: table });
  } catch (error) {
    next(error);
  }
};
