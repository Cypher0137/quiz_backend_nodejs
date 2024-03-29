const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Fetching questions from the API
app.get('/api/questions', async (req, res) => {
  try {
    const response = await axios.get(
      'https://opentdb.com/api.php?amount=15'
    );
    const questions = response.data.results.map((question) => ({
      question: question.question,
      choices: [...question.incorrect_answers, question.correct_answer],
      correctAnswer: question.correct_answer,
    }));
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Handling root route
app.get('/', (req, res) => {
  res.send('Welcome to the Quiz Application Backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
