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

const usersRouter = require('./routes/usersRouter.js');
app.use('/api/users', usersRouter);

app.use("/", express.static(path.join(__dirname, "/build"))); 
app.get("/*", (req, res) => res.sendFile(__dirname + "/build/index.html"));
console.log(__dirname);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
