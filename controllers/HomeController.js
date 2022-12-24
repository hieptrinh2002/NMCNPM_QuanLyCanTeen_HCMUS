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
                res.render('../views/index_2 (2).pug',{foodStore: foodStore});
            }
        })
    }).catch((error) => {
        console.log(error);
        res.status(200).json(error)
    });
}


const addFood = async (req,res) => {
    let id = req.body.id;
    console.log(id);
    db.connectDB()
    .then((result) => {
        result.query('SELECT * FROM product WHERE product_id=?',[id],(err,data)=>{
            if(err) throw err;
            else{
                let food = data[0];
                console.log(food)
                if(typeof req.session.cart == "undefined"){
                    req.session.cart = [];
                    req.session.cart.push({
                        name: food.product_name,
                        qty: req.body.quantity,
                        price: parseInt(food.price),
                        image: food.image_link,
                        id: id
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
                            name: food.product_name,
                            qty: 1,
                            price: parseInt(food.price),
                            image: food.image_link,
                            id: id
                        })
                    }
                }
            }
            console.log(req.session.cart)
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
    for(let i =0;i< cart.length; i++){
        if(cart[i].id == id){
            switch(action){
                case 'add':
                    cart[i].qty++;
                    break;
                case 'remove':
                    cart[i].qty--;
                    if(cart[i].qty < 1)
                        cart.splice(i,1);
                    break;
                case 'clear':
                    cart.splice(i,1);
                    if(cart.length == 0) 
                        delete req.session.cart;
                    break;
                default:
                    console.log('Update had problem !!!');
                    break;
            }
            break;
        }
        
    }
    res.redirect('/cart');

}
const clearCart = (req,res) => {
    delete req.session.cart;
    res.redirect('/cart');
}
const Test = async (req,res,next) => {
    const order_items = req.body;
    console.log('Xuat ra oi ne')
    console.log(order_items);
   
}
module.exports = {
    Show,
    addFood,
    Test,
    clearCart,
    updateCart,
    
}