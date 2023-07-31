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
                users_id INTEGER REFERENCES users(users_id),
                first_name VARCHAR(35) NOT NULL,
                last_name VARCHAR(35) NOT NULL,
                hourly_wage FLOAT NOT NULL
            );

            CREATE TABLE subscribers (
                subscriber_id SERIAL PRIMARY KEY,
                name VARCHAR(50),
                email VARCHAR(100)
            );

            INSERT INTO users(first_name,last_name,user_name,email,password) VALUES('Oscar','Perez-Hernandez','OPHManager','perezoscar1234@gmail.com','Password');

            INSERT INTO employee(users_id,first_name,last_name,hourly_wage) VALUES(1,'Alex','Hernandez',30.25), 
            (1, 'Carmen','Hernandez',40.50), 
            (1, 'Daisy','Martinez',25.25),
            (1, 'Edwin','Facio',20.50), 
            (1, 'Daniela','Uresti',20.50), 
            (1, 'Leonardo','Garcia',24.75), 
            (1, 'Leon','Perez',25.25), 
            (1, 'Roman','Hernandez',35.25), 
            (1, 'Leslie','Maldonado',25.25), 
            (1, 'Pablo','Villa',25.25);

            `).then(() => {
                console.log('DB seeded!')
                res.sendStatus(200)
            }).catch(err => console.log('error seeding DB', err))
        }
    }