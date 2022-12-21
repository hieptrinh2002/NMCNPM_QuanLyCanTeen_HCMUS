const User = require("../models/user")
const people = require('../assets/demoData.people.json')
const db = require('../models/database')
const jwt = require('jsonwebtoken');
const vt = require('./token');
const bcrypt = require('bcrypt');
const { connect } = require("../models/database");

const showLogin = async(req,res)=>{
    res.render('login_page');
}
const showRegister = async(req,res)=>{
    res.render('register');
}

const RegisterController = async (req,res) => {
    const userInput = {
        
    }
    let sql = `SELECT * FROM`
    try{
        if(userInput){ 
            db.connectDB()
            .then((connection) =>{
                connection.query(sql,userInput.username, (err, data) => {
                    console.log(data);
                    if (err) 
                    {
                        throw err;
                    }
                    if (data.length > 0) {
                        res.render('register',{message: "This email has already used"})
                    }
                    else if(userInput.password != userInput.confirmPassword){
                        res.render('register',{message: "Password is not matched!!"})
                    } 
                    else{
                        return res.status(200).json(userInput);

                    }
                })
            })
            .then((connection)=>{
                let pwd = userInput.password;
                userInput.password = bcrypt.hashSync(pwd,10);
                let sql = `INSERT INTO bangluu SET name = ?, email = ?, role = ?`;
                connection.query(sql,[userInput.username,userInput.email,userInput.password],(err,result)=>{
                    if(err) throw err;
                    else{
                        res.render('login',{message: "Registered successfully"});
                    }
                        
                })
            })
        }   
    }
    catch(error){
        console.log("errrrorrr")
        return res.status(200).json(error);
    }
    
}

const LoginController = async(req, res,next) => 
{
    const userInput = {
        username: req.body.username,
        password: req.body.password
    }
    console.log(userInput.username);
    console.log(userInput.password);
    let sql = `SELECT * FROM staff WHERE username = ?`;
    try{
        if(userInput){ 
            db.connectDB()
            .then((connection) =>{
                connection.query(sql,[userInput.username], (err, result) => {
                    console.log(result);
                    if (err) 
                    {
                        throw err;
                    }
                    if (result.length >=1) 
                    {
                        if(/*bcrypt.compareSync(userInput.password,data[0].password)*/userInput.password ==result[0].password ){
                            console.log('1');
                            req.session.user = result[0];
                            //console.log(JSON.stringify(req.session.user));
                            res.redirect('/index');
                            //db.closeDB();  
                            
                        }
                        else{
                            console.log('2')
                            res.render('login_page',{message: "Password is wrong!!"});
                        }
                    }
                    else{
                        console.log('3')
                        res.render('login_page',{message: "This username is not existed"});
                    }
                })
            })
        }   
    }
    catch(error){
        console.log("errrrorrr")
        return res.status(200).json(error);
    }
}
  
    


exports.get = async (req, res) => {
    res.render('register', {title : 'USER - REGISTER'});

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
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}
const logOut = async (req,res) => {
    if(req.session.user){
        req.session.destroy(()=>{
            res.redirect('/')
        })
    }
} 
module.exports = {
    LoginController,
    RegisterController,
    showLogin,
    showRegister,
    logOut
}