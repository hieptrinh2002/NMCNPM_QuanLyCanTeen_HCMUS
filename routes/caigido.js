const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001;
const AuthController = require('../../controllers/staff/AuthController');
const { use } = require('./routes/user.route');
const HomeController = require('./controllers/HomeController');
const cartController = require("../../controllers/staff/CartController")
const paymentController = require("./controllers/paymentController")
const ProductRoutes = require("../../controllers/staff/productController")





app.post('/index/add/:id',cartController.addFood)

//app.post('/index/add/:id',HomeRoutes.addFood)
let USER;
app.get("/payment",PayRoutes.chooseMethod)
app.post("/payment",PayRoutes.Payment)
app.get('/shop',(req,res)=>{
    res.render("../views/shop.pug")
})
app.get('/shopping-cart',(req,res)=>{
    res.render("../views/shopping-cart.pug")
})
app.get('/cart',CartRoutes.viewCart)
app.get('/cart/update/:id',CartRoutes.updateCart)
//app.use('/auth',userRoutes.LoginController)
//
app.get("/payment/success",(req,res)=>{
    res.render("../views/success.pug")
})
app.get("/payment/unsuccess",(req,res)=>{
    res.render("../views/unsuccess.pug")
})