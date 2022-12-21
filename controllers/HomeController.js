const mysql =- require('mysql');
const db = require('../models/database');
let USER;
const Show = async (req,res,next)=>{
    //USER = res.locals.user;
    //console.log('Xuat ra roi ne');
    //console.log(USER);
    db.connectDB()
    .then((result) => {
        result.query('SELECT * FROM product',(err,data)=>{
            if(err) throw err;
            else{
                let foodStore = data;
                res.render('../views/index_2 (1).pug',{foodStore: foodStore});
            }
        })
    }).catch((error) => {
        console.log(error);
        res.status(200).json(error)
    });
}


const addFood = async (req,res,next) => {
    let id = req.body.product_id;
    console.log(id)
    db.connectDB()
    .then((result) => {
        result.query('SELECT * FROM product WHERE product_id=?',[id],(err,data)=>{
            if(err) throw err;
            else{
                let food = data[0];
                if(typeof req.session.cart == "undefined"){
                    req.session.cart = [];
                    req.session.cart.push({
                        //push thông tin vào đây
                    })
                }else{
                    let cart = req.session.cart;
                    let newItems = true;
                    for(let i =0;i<cart.length;i++){
                        if(cart[i].name == food.name){
                            cart[i].qty++;
                            newItems = false;
                            break;
                        }
                    }
                    if(newItems){
                        req.session.cart.push({
                            //push thông tin vào đây
                        })
                    }
                }
            }
            res.redirect('/index');
        })
    }).catch((error) => {
        console.log(error);
        res.status(200).json(error)
    });
}
const updateCart = async (req,res,next) =>{
    let id = req.params.id;
    let cart = req.session.cart;
    let action = req.query.action;

}
const Test = async (req,res,next) => {
    const order_items = req.body;
    console.log('Xuat ra oi ne')
    console.log(JSON.stringify(order_items))
}
module.exports = {
    Show,
    addFood,
    Test
}