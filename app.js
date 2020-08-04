'use strict'
const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./configs/index');
const routes = require('./routes/routes');
const errorHandling = require('./utils/middleware/errorHandling');

// Using cors middleware
const corsOptions = {
  origin: true,
  methods: ['GET', 'POST']
};

app.use(cors(corsOptions));
app.use(routes);
// Middleware
app.use(errorHandling);


// eslint-disable-next-line no-console
app.listen(config.port, () => console.log(`Listening in port ${config.port}`));

