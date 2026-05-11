const express = require('express');
const { getUsers, createUser, deactivateUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { body } = require('express-validator');

const router = express.Router();

// Only admin and manager can access user routes
router.use(protect);
router.use(authorize('admin', 'manager'));

const userValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['admin', 'manager', 'staff']).withMessage('Invalid role'),
];

router.route('/')
  .get(getUsers)
  .post(validate(userValidation), createUser);

router.delete('/:id', authorize('admin'), deactivateUser);

module.exports = router;
