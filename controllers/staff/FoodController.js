const mysql =- require('mysql');
const db = require('../../models/database');
let USER;

const Show = async (req,res,next)=>{
    if(res.locals.user == null)
    {
        res.redirect('/');
    }
    db.connectDB()
    .then((result) => {
        result.query('SELECT * FROM product',(err,data)=>{
            if(err) throw err;
            else{
                let foodStore = data;
                res.render('../views/index.pug',{foodStore: foodStore});
            }
        })
    }).catch((error) => {
        console.log(error);
        res.status(200).json(error)
    });
}



module.exports = {
    Show

    
}