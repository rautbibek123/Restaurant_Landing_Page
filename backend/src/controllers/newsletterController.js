const Newsletter = require('../models/Newsletter');
const sendEmail = require('../config/nodemailer');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
// @access  Public
exports.subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if already subscribed
    let subscriber = await Newsletter.findOne({ email });

    if (subscriber) {
      if (!subscriber.active) {
        subscriber.active = true;
        await subscriber.save();
        return res.status(200).json({ success: true, message: 'Subscription reactivated' });
      }
      return res.status(400).json({ success: false, message: 'Email already subscribed' });
    }

    subscriber = await Newsletter.create({ email });

    // Optional: Send a welcome email
    await sendEmail({
      email,
      subject: 'Welcome to Annapurna Kitchen Newsletter! 🏔️',
      message: 'Thank you for subscribing! We will keep you updated with our latest seasonal menus, special events, and stories from the Himalayas.',
    });

    res.status(201).json({
      success: true,
      data: subscriber,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
exports.unsubscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({ success: false, message: 'Subscriber not found' });
    }

    subscriber.active = false;
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed',
    });
  } catch (error) {
    next(error);
  }
};
