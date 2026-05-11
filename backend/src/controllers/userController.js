const User = require('../models/User');

// @desc    Get all staff/managers
// @route   GET /api/users
// @access  Private (Admin/Manager)
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort('-createdAt');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new user
// @route   POST /api/users
// @access  Private (Admin)
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Managers can't create admins
    if (req.user.role === 'manager' && role === 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to create an admin account' });
    }

    const user = await User.create({ name, email, password, role });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Deactivate a user
// @route   DELETE /api/users/:id
// @access  Private (Admin)
exports.deactivateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    user.active = false;
    await user.save();
    res.status(200).json({ success: true, message: 'User deactivated' });
  } catch (error) {
    next(error);
  }
};
