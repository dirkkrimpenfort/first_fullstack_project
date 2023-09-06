const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use (express.json());

require('dotenv').config();
const PORT = process.env.PORT;

const { connect, closeConnection } = require('./configs/db.js');
connect();

const usersRouter = require('./routes/usersRouter');
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
