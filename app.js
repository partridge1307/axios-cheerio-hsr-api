const express = require('express');
const app = express();

const characterRoutes = require('./routes/characterRoutes');

app.use('/api/v1/characters', characterRoutes);

module.exports = app;
