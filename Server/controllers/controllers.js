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

    getAllPayroll:(req, res) => {
        sequelize.query(`
        SELECT*FROM payout;
    `)
    .then(dbRes => {
        console.log('paid employee')
        return res.status(200).send(dbRes[0])
    })
    },

    addAEmployee:(req,res) => {
        const {userId, firstName, lastName} = req.body
        sequelize.query(`
        INSERT INTO employee(managers_id,first_name,last_name) VALUES (${userId},'${firstName}','${lastName}');
        `)
        .then(dbRes => {
            console.log("You've added a new employee!")
            return res.status(200).send(dbRes[0])
        })
    },

    updateEmployee:(req,res) => {
        let {id} = req.params
        let {userId, firstName, lastName, hourlyWage} = req.body
        sequelize.query(`
            UPDATE employee set
            users_id = ${userId},
            first_name = '${firstName}',
            last_name = '${lastName}',
            hourly_wage = ${hourlyWage},
            WHERE employee_id = ${id};
        `)
        .then(dbRes => {
            console.log("You've successfully updated an employee");
            return res.status(200).send("You've successfully updated an employee")
        })
        .catch(err => console.error(err))
    }
}