const express = require('express');
const app = express();
app.use(express.json());

// Data
let users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];

// Getting a list of all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Getting a user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Adding a new user
app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json(user);
});

// Updating a user by ID
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const newUser = req.body;
  users = users.map(user => (user.id === userId ? newUser : user));
  res.json(newUser);
});

// Deleting a user by ID
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter(user => user.id !== userId);
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});