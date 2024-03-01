const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const productApi = require('./routes/productApi');

app.use(cors());

const PORT = 3001;

http.createServer(app).listen(PORT, () => {
  console.log(`Listen on 0.0.0.0:${PORT}`);
});

app.get('/', (_, res) => {
  res.send({ status: 200 });
});

app.use(express.json());
app.use(productApi);

process.on('SIGINT', function () {
  process.exit();
});
