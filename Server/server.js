require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')
const bcrypt = require('bcrypt');

const {getAllEmployee, addAEmployee,updateEmployee,deleteEmployee} = require('./controllers/controllers.js')
const {login, register} = require('./controllers/auth')


app.use(express.json());
app.use(cors());

// TO SEED DB UN COMMENT, MAKE REQUEST THEN COMMENT POST REQUEST
// app.post('/seed', seed)
app.post(`/login`, login)
app.post(`/register`, register)
// app.get('/home', getAllEmployee)
// app.post('/employee', addAEmployee)
// app.put('/employee/:id', updateEmployee)
// app.delete('/deleteEmployee/:id', deleteEmployee)

app.listen(SERVER_PORT, () => console.log(`Server is up and listening on ${SERVER_PORT}`))