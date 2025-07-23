
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Expense = require('../models/Expense');

// GET all expenses for a user
router.get('/', verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ user_id: req.user._id });

    console.log(expenses);
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/', verifyToken, async (req, res) => {

  const { title, amount, category, date, status, due_date, description } = req.body;
  
  console.log('AUTH HEADER:', req.headers['authorization']);
  console.log('data',req.body.date, req.body.title, req.body.description)

  try {
    const newExpense = new Expense({
      user_id: req.user._id,
      title,
      amount,
      category,
      description,
      date,
      status,
      due_date: status === 'planned' ? due_date : date,
    });

    const saved = await newExpense.save();
    res.status(201).json({ message: 'Expense saved', expense: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Could not save expense' });
  }
});


module.exports = router;
