require('dotenv').config()
const { CONNECTION_STRING } = process.env;

const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING,{
    dialect:'postgres',
    dialectOptions : {
       ssl:{
        rejectUnauthorized: false
       } 
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            DROP TABLE IF EXISTS payout;
            DROP TABLE IF EXISTS employee;
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS subscribers;

            CREATE TABLE users (
                users_id SERIAL PRIMARY KEY,
                first_name VARCHAR(35) NOT NULL,
                last_name VARCHAR(35) NOT NULL,
                user_name VARCHAR(35),
                email VARCHAR(100) NOT NULL,
                password VARCHAR(500) NOT NULL
            );

            CREATE TABLE employee (
                employee_id SERIAL PRIMARY KEY,
                managers_id INTEGER REFERENCES users(users_id),
                first_name VARCHAR(35) NOT NULL,
                last_name VARCHAR(35) NOT NULL
            );

            CREATE TABLE subscribers (
                subscriber_id SERIAL PRIMARY KEY,
                name VARCHAR(50),
                email VARCHAR(100)
            );

            CREATE TABLE payout (
                id SERIAL PRIMARY KEY,
                employee_id INTEGER REFERENCES employee(employee_id),
                hourly_wage NUMERIC NOT NULL,
                hours_worked NUMERIC NOT NULL,
                timestamp timestamp default current_timestamp,
                gross_pay NUMERIC GENERATED ALWAYS AS(hourly_wage * hours_worked) STORED
            );

            INSERT INTO users(first_name,last_name,user_name,email,password) VALUES('Oscar','Perez-Hernandez','OPHManager','perezoscar1234@gmail.com','Password');

            INSERT INTO employee(managers_id,first_name,last_name) VALUES(1,'Alex','Hernandez'), 
            (1, 'Carmen','Hernandez'), 
            (1, 'Daisy','Martinez'),
            (1, 'Edwin','Facio'), 
            (1, 'Daniela','Uresti'), 
            (1, 'Leonardo','Garcia'), 
            (1, 'Leon','Perez'), 
            (1, 'Roman','Hernandez'), 
            (1, 'Leslie','Maldonado'), 
            (1, 'Pablo','Villa');

            INSERT INTO payout(employee_id, hourly_wage, hours_worked) VALUES(1, 50, 40);
            
            `).then(() => {
                console.log('DB seeded!')
                res.sendStatus(200)
            }).catch(err => console.log('error seeding DB', err))
        }
    }