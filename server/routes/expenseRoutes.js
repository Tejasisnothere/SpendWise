
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Expense = require('../models/Expense');

// GET all expenses for a user
router.get('/', verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST a new expense
router.post('/', verifyToken, async (req, res) => {
  const { title, amount, category, type, date } = req.body;

  try {
    const newExpense = new Expense({
      user: req.user.id,
      title,
      amount,
      category,
      type,
      date
    });

    const saved = await newExpense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ msg: 'Could not save expense' });
  }
});

module.exports = router;
