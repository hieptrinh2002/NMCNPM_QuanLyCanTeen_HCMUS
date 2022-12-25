const mysql = require('mysql');
const db = require('../../models/database');
let USER;
let CART;
function isProductInCart(cart,id){
    for(let i = 0;i < cart.length; i++){
        if(cart[i].id == id){
            return true;
        }
    }

    return false;
}
const viewCart = async (req,res,next)=>{
    USER = res.locals.user;
    console.log(req.session.cart)
    let totals = 0;
    if(req.session.cart && req.session.cart.length == 0 || typeof req.session.cart == "undefined"){
        delete req.session.cart;
        res.render('../views/cart.pug',{
            title: 'My cart',
            isEmpty: 1
        })
    }else{

        res.render('../views/cart.pug',{
            title: 'My cart',
            carts: req.session.cart,
            isEmpty: 0,
        })
    }
}

const addFood = async (req,res) => {
    let id = req.body.id;
    let quantiti = req.body.quantity;
    console.log(quantiti);
    db.connectDB()
    .then((result) => {
        result.query('SELECT * FROM product WHERE product_id=?',[id],(err,data)=>{
            if(err) throw err;
            else{
                let food = data[0];
                if(typeof req.session.cart == "undefined"){
                    req.session.cart = [];
                    req.session.cart.push({
                        name: food.product_name,
                        qty: parseInt(quantiti),
                        price: parseInt(food.price),
                        image: food.image_link,
                        id: id
                    })
                } else {
                    let cart = req.session.cart;
                    console.log(cart);
                    if(isProductInCart(cart,id))
                    {
                        for(let i = 0;i < cart.length;i++){
                            if(cart[i].id == id){
                                cart[i].qty= parseInt(cart[i].qty) + parseInt(quantiti) ;
                                console.log(cart[i].qty)
                                break;
                            }
                        }
                    }
                    else{
                        req.session.cart.push({
                            name: food.product_name,
                            qty: parseInt(quantiti),
                            price: parseInt(food.price),
                            image: food.image_link,
                            id: id
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
    console.log(req.params);
    let cart = req.session.cart;
    let action = req.query.action;
    for(let i =0;i< cart.length; i++){
        if(cart[i].id == id){
            switch(action){
                case 'add':
                    cart[i].qty++;
                    console.log("Check")
                    console.log(req.session.cart);
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

module.exports = {
    viewCart,
    addFood,
    clearCart,
    updateCart

}