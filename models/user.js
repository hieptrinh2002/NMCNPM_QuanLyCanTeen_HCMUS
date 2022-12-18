const mysql = require('mysql');
const express = require('express');
const app = express();
require('dotenv').config();

const getStaff_byID = async (req, res) => {
    const idUser = req.query.idUser;
    console.log(idUser);
    const SqlString = 'SELECT * FROM `staff` as s where s.staff_id = ?';
    try {
        if (idUser) {
            db.createConnection()
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
        return res.status(200).json(error);
    }
};

const getAllStaff = async (req, res) => {
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
        return res.status(200).json(error);
    }
};

const getAllCustomer = async (req, res) => {
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
        return res.status(200).json(error);
    }
};


const getCustomer_byID = async (req, res) => {
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
        return res.status(200).json(error);
    }
};



const getProducts = async (req, res) => {
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
        return res.status(200).json(error);
    }
};

module.exports = {
    getProducts,
    getCustomer_byID,
    getAllCustomer,
    getAllStaff,
    getStaff_byID
}