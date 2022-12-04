const User = require("../models/user.model")
const people = require('../assets/demoData.people.json')
const db = require('../models/database')

class userController {
    get(req, res) {
        // res.status(200).send([{ name: "trinh hiep", adresss: "Quang Nam" }])
        // req voi tham so 
        const idUser = req.query.idUser;

        console.log(idUser);

        const peopleById = people.filter(person => person.id == 3); // == (3=='3') , === (3!='3')

        return res
            .status(200)
            .json(peopleById);
    }

    post(req, res) {
        const username = req.body.username
        const password = req.body.password
        console.log("username : ", username);
        console.log("password : ", password);

        const sql = 'SELECT s.username, s.password FROM `staff` as s';
        db.connectDB()
            .then((conection) => {
                conection.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        let accounts = [];

                        result.map((row) => {
                            accounts.push({
                                username: row.username,
                                password: row.password
                            })
                        })

                        console.log(accounts);
                        return res.status(200).json(result);

                    }
                })
            })
            .catch((erorr) => {
                res.status(200).send("<h1> connect Failed </h1>")
            })

    }
}

module.exports = new userController();
