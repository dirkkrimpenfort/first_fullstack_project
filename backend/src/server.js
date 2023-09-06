const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use (express.json());
const path = require('path');

require('dotenv').config();
const PORT = process.env.PORT;

const { connect, closeConnection } = require('./configs/db.js');
connect();

const usersRouter = require('./routes/usersRouter');
app.use('/api/users', usersRouter);

//app.use("/", express.static(path.join(__dirname, "/src/build"))); 
//app.get("/*", (req, res) => res.sendFile(__dirname + "src/build/index.html"));



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
