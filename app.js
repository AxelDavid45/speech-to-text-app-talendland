const express = require('express');
const app = express();
const config = require('./configs/index');
const routes = require('./routes/routes');

app.use(routes);

app.listen(config.port, () => console.log(`Listening in port ${config.port}`));
