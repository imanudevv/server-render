require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModal = require('./models/Users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.get('/', (req, res) => {
  res.send("🚀 Server is running successfully on Render!");
});

app.get('/users', (req, res) => { 
  UserModal.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModal.findById(id)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id;
  UserModal.findByIdAndUpdate(id, req.body, { new: true })
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModal.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/createUser', (req, res) => {
  UserModal.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Use Render's assigned port or fallback to 3001 locally
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
