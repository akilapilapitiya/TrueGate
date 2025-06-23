const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Auth server running at localhost:${port}`);
});
