const express = require('express');
const { getTables, updateTable } = require('../controllers/tableController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getTables);

router.route('/:number')
  .put(updateTable);

module.exports = router;
