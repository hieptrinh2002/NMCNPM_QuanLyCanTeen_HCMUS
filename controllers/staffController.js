const db = require('../models/database');

const showDashboard = async(req,res) => {
    db.connectDB()
    .then((result) => {
        result.query('',(err,numUser))  
    }).catch((err) => {
        
    });
}

const showChart = async (req,res) => {
    res.render('/chart',{layout: 'other'});
}

const showOrder = async (req,res) => {
    db.connectDB()
    .then((result) =>{
        result.query('SELECT * FROM',(err,data)=>{
            if(err) throw err;
            else{
            res.render('/order',{layout: 'other',data})
            }
        })

    }).catch((error) => {
        console.log(error)
        return res.status(200).json(error);
    })
}

const deleteOrder  = async (req,res) => {
    db.connectDB()
    .then((result) =>{
        result.query('DELETE FROM ... WHERE ... = ?  ',[req.body.id],(err)=>{
            if(err) throw err;
            else{
            res.redirect('/order');
            }
        })

    }).catch((error) => {
        console.log(error)
        return res.status(200).json(error);
    })
}

const showRevenue = async (req,res) => {
    db.connectDB()
    .then((result) =>{
        result.query('SELECT * FROM... JOIN (... JOIN (...JOIN ... ON ...))',(err,data)=>{
            if(err) throw err;
            else{
            res.render('/revenue',{layout: 'other',data})
            }
        })

    }).catch((error) => {
        console.log(error)
        return res.status(200).json(error);
    })
}

