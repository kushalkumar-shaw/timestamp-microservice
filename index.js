const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Root endpoint
app.get('/', (req, res) => {
  res.send('Timestamp Microservice is running');
});

// Timestamp API endpoint
app.get('/api/:date?', (req, res) => {
  let { date } = req.params;

  let parsedDate;

  if (!date) {
    parsedDate = new Date();
  } else {
    // If it's a number (timestamp)
    if (!isNaN(date) && /^\d+$/.test(date)) {
      parsedDate = new Date(parseInt(date));
    } else {
      parsedDate = new Date(date);
    }
  }

  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
