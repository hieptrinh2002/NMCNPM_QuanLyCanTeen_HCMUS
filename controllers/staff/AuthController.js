const db = require('../../models/database')
//const jwt = require('jsonwebtoken');
//const vt = require('./token');
const bcrypt = require('bcrypt');


const showLogin = async(req,res)=>{
    res.render('./login_page.pug');
}
const showRegister = async(req,res)=>{
    res.render('./signin_page');
}

const RegisterController = async (req,res) => {
    const userInput = {
        username: req.body.username,
        email: req.body.gmail,
        password: req.body.password,
        phone: req.body.phone,
        confirmPassword: req.body.confirmPassword
    }
    let sql = `SELECT * FROM staff where username = ?`
    try{
        if(userInput){ 
            db.connectDB()
            .then((connection) =>{
                connection.query(sql,[userInput.username], (err, data) => {
                    console.log(data);
                    if (err) 
                    {
                        throw err;
                    }
                    if (data.length > 0) {
                        res.render('register',{alert: "This username has already used"})
                    }
                    else if(userInput.password != userInput.confirmPassword){
                        res.render('register',{alert: "Password is not matched!!"})
                    } 
                    else{
                        let pwd = userInput.password;
                        userInput.password = bcrypt.hashSync(pwd,10);
                        let sql = `INSERT INTO staff SET username = ?, gmail = ?, password = ?, phone = ?`;
                        connection.query(sql,[userInput.username,userInput.email,userInput.password,userInput.password],(err,result)=>{
                            if(err) throw err;
                            else{
                                res.render('login',{alert: "Registered successfully"});
                            }
                        
                        })
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
                            console.log(req.session.user)
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