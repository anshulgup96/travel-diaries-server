import express from 'express';
import cors from 'cors';
import './loadEnvironment.js';
import 'express-async-errors';
import posts from './routes/posts.js';
import users from './routes/users.js';

const PORT = process.env.PORT || 5050;
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
const app = express();

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
app.use(express.json());

// Load the /posts routes
app.use('/posts', posts);
app.use('/users', users);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send('Uh oh! An unexpected error occured.');
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
