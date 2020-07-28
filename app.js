'use strict'
const express = require('express');
const app = express();
const config = require('./configs/index');
const routes = require('./routes/routes');
const errorHandling = require('./utils/middleware/errorHandling');

app.use(routes);
// Middleware
app.use(errorHandling);

app.listen(config.port, () => console.log(`Listening in port ${config.port}`));

