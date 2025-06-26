const express = require('express');
const cors = require('cors');
const postsRoutes = require('./routes/posts');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/admin/posts', postsRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
