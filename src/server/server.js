const express = require('express');
const cors = require('cors');
const app = express();

// Use the CORS middleware
app.use(cors({
  origin: ['http://localhost:3001', 'https://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Body parser middleware
app.use(express.json());

// Endpoint for validating user data
app.post('/validate', (req, res) => {
  const { full_name, email, phone } = req.body;

  // Simulate validation logic
  const isValidEmail = email.includes('@');
  const isValidPhone = phone.length === 14;

  // Return the validated data
  res.json({
    full_name,
    email: isValidEmail ? email : 'Invalid Email',
    phone: isValidPhone ? phone : 'Invalid Phone Number',
  });
});

// Endpoint for processing user data batch
app.post('/processUserBatch', (req, res) => {
  const batch = req.body;
  console.log('Received user batch:', batch);

  // Process the user batch data here
  res.status(200).send({ message: 'User batch processed successfully' });
});

// Endpoint for processing order data batch
app.post('/processOrderBatch', (req, res) => {
  const batch = req.body;
  console.log('Received order batch:', batch);

  // Process the order batch data here
  res.status(200).send({ message: 'Order batch processed successfully' });
});

// Handle CORS preflight requests
app.options('*', cors());

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
