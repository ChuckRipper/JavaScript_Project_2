require('dotenv').config();

const http = require('http');
const app = require('./app');
const sequelize = require('./utils/db');

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
