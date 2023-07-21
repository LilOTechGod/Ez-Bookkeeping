require('dotenv').config();
const {CONNECTION_STRING} = process.env

const Sequelize = require('sequelize');
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect:'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports= {
    seed: (req, res) => {
        sequelize.query(`

            DROP TABLE IF EXISTS user;
            DROP TABLE IF EXISTS employee;

            CREATE TABLE user(
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(35) NOT NULL,
                last_name VARCHAR(35) NOT NULL,
                user_name VARCHAR(35),
                email VARCHAR(100) NOT NULL,
                password VARCHAR(500) NOT NULL
            );

            CREATE TABLE employee (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(35) NOT NULL,
                last_name VARCHAR(35) NOT NULL,
                hourly_wage FLOAT(15) NOT NULL
            );

            CREATE TABLE subscribers (
                subscriber_id SERIAL PRIMARY KEY,
                name VARCHAR(50),
                email VARCHAR(100)
            );

            INSERT INTO user(first_name,last_name,user_name,email,password) VALUES('Oscar','Perez-Hernandez','OPHManager','perezoscar1234@gmail.com','Password')

            INSERT INTO employee(first_name,last_name,hourly_wage) VALUES('Alex','Hernandez',30.25), ('Carmen','Hernandez',40.50), ('Daisy','Martinez',25.25), ('Edwin','Facio',20.50), ('Daniela','Uresti',20.50), ('Leonardo','Garcia',24.75), ('Leon','Perez',25.25), ('Roman','Hernandez',35.25), ('Leslie','Maldonado',25.25), ('Pablo','Villa',25.25);

        `)
        .then(() => {
            console.log('DB seeded successfully!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}