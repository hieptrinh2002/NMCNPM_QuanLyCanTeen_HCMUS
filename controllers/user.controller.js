const User = require("../models/user.model")
const people = require('../assets/demoData.people.json')
const db = require('../models/database')

// class userController {
//     get(req, res) {
//         // res.status(200).send([{ name: "trinh hiep", adresss: "Quang Nam" }])
//         // req voi tham so 
//         const idUser = req.query.idUser;

//         console.log(idUser);

//         const peopleById = people.filter(person => person.id == 3); // == (3=='3') , === (3!='3')

//         return res
//             .status(200)
//             .json(peopleById);

//     }

//     post(req, res) {
//         const username = req.body.username
//         const password = req.body.password
//         console.log("username : ", username);
//         console.log("password : ", password);

//         const sql = 'SELECT s.username, s.password FROM `staff` as s';
//         db.connectDB()
//             .then((conection) => {
//                 conection.query(sql, function (err, result, fields) {
//                     if (err) throw err;
//                     else {
//                         let accounts = [];

//                         result.map((row) => {
//                             accounts.push({
//                                 username: row.username,
//                                 password: row.password
//                             })
//                         })

//                         console.log(accounts);
//                         return res.status(200).json(result);

//                     }
//                 })
//             })
//             .catch((erorr) => {
//                 res.status(200).send("<h1> connect Failed </h1>")
//             })

//     }
// }
// module.exports = new userController();


exports.get = async (req, res) => {
    // res.status(200).send([{ name: "trinh hiep", adresss: "Quang Nam" }])
    // req voi tham so 
    const idUser = req.query.idUser;

    console.log(idUser);

    const peopleById = people.filter(person => person.id == 3); // == (3=='3') , === (3!='3')

    return res
        .status(200)
        .json(peopleById);

}
exports.post = async (req, res) => {
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
                    db.connectDB(conection)
                    return res.status(200).json(result);

                }
            })
        })
        .catch((erorr) => {
            res.status(200).send("<h1> connect Failed </h1>")
        })

}

exports.getSatff_byID = async (req, res) => {
    const idUser = req.query.idUser;
    console.log(idUser);
    const SqlString = 'SELECT * FROM `staff` as s where s.staff_id = ?';
    try {
        if (idUser) {
            db.connectDB()
                .then((conection) => {
                    conection.query(SqlString, [idUser], function (err, result, fields) {
                        if (err) throw err;
                        else {
                            console.log(result);
                            db.closeDB(conection);
                            return res.status(200).json(result);
                        }
                    })
                })

        }
    } catch (error) {
        console.log("errrrorrr")
        res.status(200).json(error)
    }
};

exports.getAllSatff = async (req, res) => {
    const SqlString = 'SELECT * FROM `staff`';
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(SqlString, [], function (err, result, fields) {
                    if (err) throw err;
                    else {
                        console.log(result);
                        db.closeDB(conection);
                        return res.status(200).json(result);
                    }
                })
            })
    } catch (error) {
        console.log("errrrorrr")
        res.status(200).json(error)
    }
};

exports.getAllCustomer = async (req, res) => {
    const SqlString = 'SELECT * FROM `customer`';
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(SqlString, [], function (err, result, fields) {
                    if (err) throw err;
                    else {
                        console.log(result);
                        db.closeDB(conection);
                        return res.status(200).json(result);
                    }
                })
            })
    } catch (error) {
        console.log("errrrorrr")
        res.status(200).json(error)
    }
};


exports.getCustomer_byID = async (req, res) => {
    const idUser = req.query.idUser;
    console.log(idUser);
    const SqlString = 'SELECT * FROM `customer` as c where c.customer_id = ?';
    try {
        if (idUser) {
            db.connectDB()
                .then((conection) => {
                    conection.query(SqlString, [idUser], function (err, result, fields) {
                        if (err) throw err;
                        else {
                            console.log(result);
                            db.closeDB(conection);
                            return res.status(200).json(result);
                        }
                    })
                })

        }
    } catch (error) {
        console.log("errrrorrr")
        res.status(200).json(error)
    }
};



exports.getProducts = async (req, res) => {
    const SqlString = 'SELECT * FROM `product`';
    try {

        db.connectDB()
            .then((conection) => {
                conection.query(SqlString, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        console.log(result);
                        db.closeDB(conection);
                        return res.status(200).json(result);
                    }
                })
            })


    } catch (error) {
        console.log("errrrorrr")
        res.status(200).json(error)
    }
};
