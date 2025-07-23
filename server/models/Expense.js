const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['rent', 'groceries', 'travel', 'subscription', 'wants', 'food', 'misc', 'entertainment'],
    default: 'misc'
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    required: true  
  },
  status: {
    type: String,
    enum: ['completed', 'planned'],
    default: 'completed'
  },
  due_date: {
    type: Date,       
    required: function() {
      return this.status === 'planned';
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Expense', expenseSchema);
