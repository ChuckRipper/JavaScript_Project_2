const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const roomRoutes = require('./routes/roomRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/scores', gameRoutes);
app.use('/api/rooms', roomRoutes);

module.exports = app;
