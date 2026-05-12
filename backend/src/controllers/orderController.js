const Order = require('../models/Order');
const ActivityLog = require('../models/ActivityLog');

// Helper for activity logging
const logActivity = async (staffId, action, details, orderId) => {
  try {
    await ActivityLog.create({ staffId, action, details, orderId });
  } catch (err) {
    console.error('Logging Error:', err);
  }
};

// @desc    Create a new POS order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const { items, totalAmount, orderType, tableNumber, paymentStatus, paymentMethod } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No order items' });
    }

    const order = await Order.create({
      items,
      totalAmount,
      orderType,
      tableNumber,
      staffId: req.user.id,
      paymentStatus: paymentStatus || 'unpaid',
      paymentMethod: paymentMethod || 'none'
    });

    await logActivity(req.user.id, 'ORDER_CREATED', `Created ${orderType} order for Rs. ${totalAmount}`, order._id);

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('CRITICAL ORDER ERROR:', error.stack);
    if (typeof next === 'function') {
      next(error);
    } else {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

// @desc    Get all orders
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('staffId', 'name').sort('-createdAt');
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    
    await logActivity(req.user.id, 'STATUS_CHANGE', `Updated status to ${status}`, order._id);

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark order as paid
// @route   PUT /api/orders/:id/pay
exports.payOrder = async (req, res, next) => {
  try {
    const { paymentMethod } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { 
        paymentStatus: 'paid', 
        status: 'completed',
        paymentMethod: paymentMethod || 'cash'
      }, 
      { new: true }
    );
    
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    
    await logActivity(req.user.id, 'PAYMENT_RECEIVED', `Payment via ${paymentMethod || 'cash'}`, order._id);

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
