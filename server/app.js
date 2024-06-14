// const express = require('express');
// const bodyParser = require('body-parser');
// const userRoutes = require('./routes/userRoutes');
// const gameRoutes = require('./routes/gameRoutes');
// const roomRoutes = require('./routes/roomRoutes');

// const app = express();

// app.use(bodyParser.json());

// app.use('/api/users', userRoutes);
// app.use('/api/scores', gameRoutes);
// app.use('/api/rooms', roomRoutes);

// module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const db = require('./utils/db');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const roomRoutes = require('./routes/roomRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/rooms', roomRoutes);

// Serve static files from the "client" directory
app.use(express.static('client'));

// Default route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

// Connect to the database and start the server
const PORT = process.env.PORT || 3000;
db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
