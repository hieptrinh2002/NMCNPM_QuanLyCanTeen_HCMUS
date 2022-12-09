const User = require("../models/user.model")
const people = require('../assets/demoData.people.json')
const db = require('../models/database');
const express = require("express");

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
exports.getStaffs = async (req, res) => {
    const id = req.query.id;
    console.log(id);

    let arr = [];
    let SqlString = "";
    if (typeof id === 'undefined') {
        SqlString = 'SELECT * FROM `staff`';
    }
    else {
        SqlString = 'SELECT * FROM `staff` as s where s.staff_id = ?';
        arr.push(id);
    }

    try {
        db.connectDB()
            .then((conection) => {
                conection.query(SqlString, arr, function (err, result, fields) {
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

exports.getCustomers = async (req, res) => {
    const id = req.query.id;
    console.log(id);

    let arr = [];
    let SqlString = "";
    if (typeof id === 'undefined') {
        SqlString = 'SELECT * FROM `customer`';
    }
    else {
        SqlString = 'SELECT * FROM `customer` as c where c.customer_id = ?';
        arr.push(id);
    }

    try {
        db.connectDB()
            .then((conection) => {
                conection.query(SqlString, arr, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        console.log(result);
                        db.closeDB(conection);
                        let customers = [];
                        result.map((row) => {
                            customers.push({
                                customer_id: row.customer_id,
                                fullname: row.fullname,
                                phone: row.phone,
                                money_available: row.money_available,
                                email: row.email,
                                id_card: row.id_card
                            })
                        })

                    }
                })
            })
    } catch (error) {
        console.log("errrrorrr")
        res.status(200).json(error)
    }
};


exports.getProducts = async (req, res) => {
    const id = req.query.id;
    console.log(id);

    let arr = [];
    let SqlString = "";
    if (typeof id === 'undefined') {
        SqlString = 'SELECT * FROM `product`';
    }
    else {
        SqlString = 'SELECT * FROM `product` as p where p.product_id = ?';
        arr.push(id);
    }

    try {
        db.connectDB()
            .then((conection) => {
                conection.query(SqlString, arr, function (err, result, fields) {
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

