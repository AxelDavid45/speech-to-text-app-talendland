const express = require('express');
const app = express();
const config = require('./configs/index');

app.get('/', (req, res) => {
  res.end('Hello world');
});

app.listen(config.port, () => console.log(`Listening in port ${config.port}`));
