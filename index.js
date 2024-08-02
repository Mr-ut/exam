require('dotenv').config({ path: '.env' });
const express = require('express');
const http = require('http');
const Question = require('./models/questions.js');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.set('view engine', 'ejs');

const database = require("./db.js");
database();

// POST API to add question with number and solution
app.post('/api/question', async (req, res) => {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ message: 'Question and answer are required' });
    }
  
    try {
      const newQuestion = new Question({
        question,
        answer
      });
      await newQuestion.save();
      res.status(201).json(newQuestion);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // GET API to get data of current date
app.get('/api/questions/today', async (req, res) => {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
  
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
  
      const questions = await Question.find({
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      });
  
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log("Error while starting the server: " + err);
  } else {
    console.log("Server started on the PORT: " + process.env.PORT || 3000);
  }
});
