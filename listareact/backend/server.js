const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Middleware per il parsing del corpo delle richieste
app.use(express.json());

// Endpoint di esempio
app.get('/api/places', (req, res) => {
  res.json([
    {
      name: "Place 1",
      city: "City 1",
      dateAdded: "2023-07-01"
    },
    {
      name: "Place 2",
      city: "City 2",
      dateAdded: "2023-06-25"
    }
  ]);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
