const express = require('express');
const cors = require('cors');
const app = express();

// Use the CORS middleware
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Body parser middleware
app.use(express.json());

app.post('/endpointA', (req, res) => {
  console.log('Data received at Endpoint A:', req.body);
  res.json({ status: 'success', endpoint: 'A', data: req.body });
});

app.post('/endpointB', (req, res) => {
  console.log('Data received at Endpoint B:', req.body);
  res.json({ status: 'success', endpoint: 'B', data: req.body });
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
