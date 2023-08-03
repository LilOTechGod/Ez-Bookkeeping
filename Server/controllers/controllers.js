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
    getAllManagers:(req,res) => {
        sequelize.query(`
            SELECT*FROM users;
        `)
        .then(dbRes => {
            console.log('Fetched all managers')
            return res.status(200).send(dbRes[0])
        })
        .catch(err => console.error(err))
    },

    getAllEmployee:(req, res) => {
        sequelize.query(`
            SELECT*FROM employee
            ORDER BY first_name;
        `)
        .then(dbRes => {
            console.log('Fetched all employees')
            return res.status(200).send(dbRes[0])
        })
        .catch(err => console.error(err))
    },

    getAllPayroll:(req, res) => {
        sequelize.query(`
        SELECT*FROM payout
        ORDER BY gross_pay desc;
    `)
        .then(dbRes => {
        console.log('paid employee')
        return res.status(200).send(dbRes[0])
         })
        .catch(err => console.error(err))
    },

    addAEmployee:(req,res) => {
        const {managerId, firstName, lastName} = req.body
        sequelize.query(`
        INSERT INTO employee(managers_id,first_name,last_name) VALUES (${managerId},'${firstName}','${lastName}')
        returning *;
        `)
        .then(dbRes => {
            console.log("You've added a new employee!")
            return res.status(200).send(dbRes[0])
        })
        .catch(err => console.error(err))
    },

    addPayroll:(req,res) => {
        const {employeeId, hourlyWage, hoursWorked} = req.body
        sequelize.query(`
        INSERT INTO payout(employee_id, hourly_wage, hours_worked) VALUES (${employeeId},${hourlyWage},${hoursWorked})
        returning *;
        `)
        .then(dbRes => {
            console.log("You've added a new payroll for an employee!")
            return res.status(200).send(dbRes[0])
        })
        .catch(err => console.error(err))
    },

    updateEmployee:(req,res) => {
        let {id} = req.params
        let {managerId, firstName, lastName} = req.body
        sequelize.query(`
            UPDATE employee set
            managers_id = ${managerId},
            first_name = '${firstName}',
            last_name = '${lastName}'
            WHERE employee_id = ${id}
            returning *;
        `)
        .then(dbRes => {
            console.log("You've successfully updated an employee");
            return res.status(200).send(dbRes[0])
        })
        .catch(err => console.error(err))
    },

    updatePayroll:(req,res) => {
        let {id} = req.params
        let {hoursWorked, hourlyWage } = req.body
        sequelize.query(`
            UPDATE payout set
            hourly_wage = ${hourlyWage},
            hours_worked = ${hoursWorked}
            WHERE id = ${id}
            returning *;
        `)
        .then(dbRes => {
            console.log("You've successfully updated an employees payroll");
            return res.status(200).send(dbRes[0])
        })
        .catch(err => console.error(err))
    },

    deleteEmployee:(req, res) => {
        const {id} = req.params
        
        sequelize.query(`
            DELETE FROM employee
            WHERE employee_id = ${id}
            returning *;
        `)
        .then(dbRes => {
            console.log("You've successfully deleted an employee");
            return res.status(200).send(dbRes[0])
        })
        .catch(err => console.error(err))
    }, 

    deleteEmployeePayroll:(req, res) => {
        const {id} = req.params
        
        sequelize.query(`
            DELETE FROM payout
            WHERE id = ${id}
            returning *;
        `)
        .then(dbRes => {
            console.log("You've successfully deleted an employees payroll");
            return res.status(200).send(dbRes[0])
        })
        .catch(err => console.error(err))
    }
}