const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
require('dotenv').config()
const {CONNECTION_STRING} = process.env


const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect:'postgres',
  dialectOptions: {
      ssl: {
          rejectUnauthorized: false
      }
  }
})

module.exports = {
  register: (req, res) => {
    const {firstName, lastName, userName, email, password} = req.body
    sequelize.query(`
      SELECT*FROM users WHERE email = '${email}'
    `)
      .then(dbRes => {
        // console.log(dbRes[0])
        if(dbRes[0][0]) {
          console.log('Another account with the same email was found, try signing up with another email (:')
          return res.status(400).send(dbRes[0][0])
        }else {
          // console.log(password);
          let salt = bcrypt.genSaltSync(10);
          const passHash = bcrypt.hashSync(password, salt)
          // console.log(passHash);
          sequelize.query(`
          INSERT INTO users(first_name,last_name,user_name,email,password) VALUES('${firstName}', '${lastName}', '${userName}', '${email}', '${passHash}');
          SELECT*FROM users WHERE email = '${email}';
          `) 
          .then(resDb => {
            // console.log(resDb[0])
            console.log('New user created!')
            return res.status(200).send(resDb[0])
          }) 
          .catch(err => console.error(err))
        }
      })
      .catch(err => console.error(err))
},
    login: (req, res) => {
      const { email, password } = req.body

     sequelize.query(`
     SELECT*FROM users WHERE email = '${email}'
     `)
     .then(dbRes => {
      if(!dbRes[0][0]) {
        console.log('Email not found, try entering an existing email associated with your account or sign up!');
        res.status(404).send(dbRes[0][0])
        return
      }
      // console.log(dbRes[0][0])
      const isValid = bcrypt.compareSync(password, dbRes[0][0].password)
      if(!isValid) {
        console.log('Incorrect password, please try again!');
        res.status(404).send(dbRes[0][0])
        return
      }
      console.log('You have been logged in successfully!')
      res.status(200).send(dbRes[0][0])
      return
     })
     .catch(err => console.error(err))
}
}