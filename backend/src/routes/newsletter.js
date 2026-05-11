const express = require('express');
const { body } = require('express-validator');
const { subscribe, unsubscribe } = require('../controllers/newsletterController');
const validate = require('../middleware/validate');

const router = express.Router();

const emailValidation = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
];

router.post('/', validate(emailValidation), subscribe);
router.post('/unsubscribe', validate(emailValidation), unsubscribe);

module.exports = router;
