'use strict'
const express = require('express');
const app = express();
const config = require('./configs/index');
const routes = require('./routes/routes');
const errorHandling = require('./utils/middleware/errorHandling');
const cors = require('cors')

app.use(cors())

app.use(routes);

// Middleware
app.use(errorHandling);


// eslint-disable-next-line no-console
app.listen(config.port, () => console.log(`Listening in port ${config.port}`));

