const express = require('express');
const expenseController = require('../controllers/expense');

const router = express.Router();

// POST /expense/addexpense - ఎక్స్‌పెన్స్‌ని యాడ్ చేయడానికి (AI ద్వారా ఆటోమేటిక్ కేటగిరైజేషన్‌తో సహా)
router.post('/addexpense', expenseController.addExpense);

module.exports = router;