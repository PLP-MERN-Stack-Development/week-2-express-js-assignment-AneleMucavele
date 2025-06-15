const express = require('express');
const app = express();
const PORT = 3000;

const logger = require('./middleware/logger');
const productRoutes = require('./products');

app.use(express.json());
app.use(logger); // custom logging middleware

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//TASK 4

const errorHandler = require('./errorHandler');

// Add after all routes
app.use(errorHandler);
