const MenuItem = require('../models/MenuItem');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
exports.getMenuItems = async (req, res, next) => {
  try {
    const { admin } = req.query;
    let query = { available: true };
    
    // If admin flag is present, show all items
    if (admin === 'true') {
      query = {};
    }

    const menuItems = await MenuItem.find(query).sort('category');
    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a menu item
// @route   POST /api/menu
// @access  Private (Admin/Manager)
exports.createMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.create(req.body);
    res.status(201).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private (Admin/Manager)
exports.updateMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private (Admin/Manager)
exports.deleteMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
