const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const users = require('./db.json').user;

// Endpoint for user sign-in
app.post('/signIn', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database
  const user = users.find(user => user.email === email);
  
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Generate JWT token if credentials are valid
  const token = jwt.sign({ email: user.email, id: user.id }, 'your_secret_key', { expiresIn: '3m' });
  res.json({ token });
});

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the authentication server');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
