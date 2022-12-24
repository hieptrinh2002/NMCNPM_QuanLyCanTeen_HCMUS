const db = require('../models/database');

const showItemsDetail = async (req,res) => {
    db.connectDB()
    .then((connection)=>{
        connection.query('SELECT * FROM product WHERE id = ?',[req.body.id],(err,result) =>{
            if(err) throw err;
            else{
                return res.json({data: result});
            }
        })
    })
}
module.exports = {
    showItemsDetail
}