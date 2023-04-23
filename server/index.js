const express = require('express');
const router = require('./routes');
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.static('client/dist'));

// set up routes
app.use('/', router);

// start and initialize the server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})