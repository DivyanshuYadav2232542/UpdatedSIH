const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve the uploaded images as static files

// Setting up multer to store images in 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Load the current data from data.json
let data = require('./data.json');

// Generate unique ID for each submission
const generateId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Route for submitting the form
app.post('/api/message', upload.single('image'), (req, res) => {
  const { name, email, phone, problem, description } = req.body;
  const imagePath = req.file ? req.file.path : null;

  const newEntry = {
    id: generateId(),
    name,
    email,
    phone,
    problem,
    description,
    image: imagePath
  };

  data.push(newEntry);

  // Save to data.json
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

  res.json({ message: 'Form submitted successfully', id: newEntry.id });
});

// Route for searching by ID
app.get('/api/message/:id', (req, res) => {
  const { id } = req.params;
  const entry = data.find(item => item.id === id);

  if (entry) {
    res.json(entry);
  } else {
    res.status(404).json({ message: 'ID not found' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
