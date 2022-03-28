const path = require('path');
const express = require('express');

const stockRouter = require("./stock/router");

const app = express();
app.use(express.static('stock-app'));
app.use('/api/stock', stockRouter);

app.use(function(req, res) {
  res.sendFile(path.resolve(__dirname, './stock-app/index.html'))
});



module.exports = app;