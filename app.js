const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001;
const userRoutes = require('./controllers/user');
const { use } = require('./routes/user.route');
const HomeRoutes = require('./controllers/HomeController');



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
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true,
    cookie: {
    maxAge: 60*60*60*24,
    httpOnly: true,
    domain:'localhost:8080',
    path: '/',
    secure: false
    }
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
app.use(express.json());
app.use(express.urlencoded());

// website -- main page
//app.use(express.static('views'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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