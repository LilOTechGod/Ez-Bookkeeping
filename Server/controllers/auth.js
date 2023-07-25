const bcrypt = require('bcrypt');
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          bcrypt.compare(password, users[i].password, (err, result) => {
            if(!err) {
              if(result) {
                res.status(200).send(users[i])
                return
              }
            }else {
              res.status(400).send('invalid password')
            }
            console.log(req.body);
          })
        }else {
          res.status(400).send("User not found.")
        }
      }
    },
    register: (req, res) => {
        console.log('Registering User')
        // console.log(req.body)
        // users.push(req.body)
        let {password} = req.body;
        const saltRounds = 10;

        // what i am hashing plus rounds
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
          req.body.password = hashedPassword;
          // password = hashedPassword
          console.log(req.body);
          users.push(req.body);
        })
        res.status(200).send(req.body);
    }
}