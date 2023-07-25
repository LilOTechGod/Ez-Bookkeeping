require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const {SERVER_PORT} = process.env

const app = express();
const {
    login,
    register
} = require('./controllers/auth')

app.post(`/api/login`, login)
app.post(`/api/register`, register)

const {seed, } = require('./controllers')

app.use(express.json());
app.use(cors());

app.listen(SERVER_PORT, () => console.log(`Server is up and listening on ${SERVER_PORT}`))