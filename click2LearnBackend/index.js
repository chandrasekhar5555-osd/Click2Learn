const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('./database');
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`app is running in PORT: ${PORT}`));

// Routes
const userRouter = require('./routes/user');
app.use(userRouter);