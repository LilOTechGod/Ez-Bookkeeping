require('dotenv').config()
let {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect:'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    getAllEmployee:(req, res) => {
        sequelize.query(`
            SELECT*FROM employee;
        `)
        .then(dbRes => {
            console.log('Fetched all employees')
            return res.status(200).send(dbRes[0])
        })
    },

    addAEmployee:(req,res) => {
        const {userId, firstName, lastName, hourlyWage} = req.body
        sequelize.query(`
        INSERT INTO employee(users_id,first_name,last_name,hourly_wage) VALUES (${userId},'${firstName}','${lastName}',${hourlyWage});
        `)
        .then(dbRes => {
            console.log("You've added a new employee!")
            return res.status(200).send("You've added a new employee!")
        })
    },

    updateEmployee:(req,res) => {
        let {hourlyWage} =req.body
        sequelize.query(`
            UPDATE employee set
            hourly_wage=${hourlyWage},
            WHERE users_id=${userId}
        `)
        .then()
        .catch()
    }
}