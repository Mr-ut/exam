const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { 
    type: String, 
    required: true 
  },
  answer: { 
    type: String, 
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Question = mongoose.model('exam', questionSchema);

module.exports = Question;
