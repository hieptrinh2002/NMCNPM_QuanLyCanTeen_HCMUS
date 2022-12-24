const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001;
const userRoutes = require('./controllers/user');
const { use } = require('./routes/user.route');
const HomeRoutes = require('./controllers/HomeController');
const CartRoutes = require("./controllers/cartController")



const path = require('path');

const expresshbs = require('express-handlebars');
//const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');



// Body-parser - Get data from client submit to browser
app.use(
    express.urlencoded({
        extended: true,
    })
);
// app.use(express.json());
app.use(cookieParser());

//------------------ STORE IN COOKIES -----------------------
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60*60 }
}))

/*app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});*/
app.use((req, res, next) => {
    res.locals.cart = req.session.cart;
    res.locals.user = req.session.user || null;
    next();
})
app.use(express.json());
app.use(express.urlencoded());

// website -- main page
//app.use(express.static('views'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded

// website -- main page
app.use(express.static('views'));


// set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));


// ================== routers =======================================
//app.use(apiPath + 'users', require("./routes/user.route"));//+ 'users'


/*app.get('/login', (req, res) => {
    res.render( "../views_3/login_page.pug");
})*/
app.get('/login',userRoutes.showLogin);
app.post('/login',userRoutes.LoginController)
app.get('/trang_chu', (req, res) => {
    res.render("../views/dashboard.pug");
})  
app.get('/index',HomeRoutes.Show)
app.post('/index',HomeRoutes.Test)
app.post('/addcart',(req,res)=>{
    mimi = req.body;
    console.log('Xuat ra roi ne');
    console.log(mimi);
})

app.post('/add/:id',HomeRoutes.addFood)
let USER;
app.get("/payment",(req,res)=>{
    USER = res.locals.user;
    //console.log('Xuat ra roi ne');
    //console.log(USER);
    res.render("../views/payment.pug")
})
app.get('/shop',(req,res)=>{
    res.render("../views/shop.pug")
})
app.get('/shopping-cart',(req,res)=>{
    res.render("../views/shopping-cart.pug")
})
app.get('/cart',CartRoutes.viewCart)
//app.use('/auth',userRoutes.LoginController)
//

/*app.get('/index',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html')
})
app.get('/trang_chu', (req, res) => {
    res.render("../views/dashboard.pug");
})  */

// app.get('/api/users', (req, res) => {
//     res.send([{ name: "trinh hiep", adresss: "Quang Nam" }]);
// })


// routers API
//app.use(apiPath + 'users', require('./routes/users.route'));
// app.use(apiPath + 'products', require('./routes/products.route'));
//app.use(apiPath + 'upload', require('./routes/upload.route'));



app.listen(port, function () {
    const host = 'localhost';
    console.log('Example app listening at http://%s:%s', host, port);
});


//https://www.youtube.com/watch?v=wuU_DfdTZOA

//nodejs - https://viblo.asia/p/nodejs-bai-3template-engines-voi-ham-render-va-viet-ma-html-voi-pug-WAyK8dj9KxX


// video quan trọng
//https://viblo.asia/p/bai-1-bootstrap-la-gi-gioi-thieu-ve-bootstrap-DzVkpLbDknW