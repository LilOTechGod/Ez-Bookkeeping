require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const {SERVER_PORT} = process.env

const app = express();


app.use(express.json());
app.use(cors());

app.listen(SERVER_PORT, () => console.log(`Server is up and listening on ${SERVER_PORT}`))