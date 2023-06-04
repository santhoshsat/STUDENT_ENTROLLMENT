require('dotenv').config();
const express = require('express');
const app = express();
const studentRouter = require('./routes/students');
const PORT = process.env.PORT;
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on('error', errorMessage => console.log(errorMessage));
db.once('open', () => console.log('Connection Established'));

app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/api/v1/students', studentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});