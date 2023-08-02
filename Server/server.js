require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed} = require('./seed.js')
const bcrypt = require('bcrypt');

const {getAllEmployee, getAllPayroll, addAEmployee, addPayroll,updateEmployee, updatePayroll, deleteEmployee, deleteEmployeePayroll} = require('./controllers/controllers.js')
const {login, register} = require('./controllers/auth')


app.use(express.json());
app.use(cors());

// TO SEED DB UN COMMENT, MAKE REQUEST THEN COMMENT POST REQUEST
app.post('/seed', seed)
app.post(`/login`, login)
app.post(`/register`, register)
app.get('/home', getAllEmployee)
app.get('/pay', getAllPayroll)
app.post('/newemployee', addAEmployee)
app.post('/newpayroll', addPayroll)
app.put('/employee/:id', updateEmployee)
app.put('/updatepay/:id', updatePayroll)
app.delete('/deleteemployee/:id', deleteEmployee)
app.delete('/deletepayroll/:id', deleteEmployeePayroll)

app.listen(SERVER_PORT, () => console.log(`Server is up and listening on ${SERVER_PORT}`))