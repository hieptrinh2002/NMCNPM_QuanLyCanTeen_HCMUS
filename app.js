const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001;
const HomeRoutes = require('./routes/HomeRoute')
var cookieParser = require('cookie-parser')
const session = require('express-session');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(
    express.urlencoded({
        extended: true,
    })
);
// website -- main page
app.use(cookieParser());
app.use(express.static('views'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60*60 }
}))
app.use('*', (req, res, next) => {
    res.locals.cart = req.session.cart;
    res.locals.user = req.session.user || null;
    next();
})
// set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ================== routers =======================================
//app.use('/api', require("./routes/api.route"));//+ 'users'
//app.use('/', require('./routes/staff/index.route'));
app.use("/",HomeRoutes)

app.listen(port, function () {
    const host = 'localhost';
    console.log('Example app listening at http://%s:%s', host, port);
});




















//https://www.youtube.com/watch?v=wuU_DfdTZOA

//nodejs - https://viblo.asia/p/nodejs-bai-3template-engines-voi-ham-render-va-viet-ma-html-voi-pug-WAyK8dj9KxX


// video quan trọng
//https://viblo.asia/p/bai-1-bootstrap-la-gi-gioi-thieu-ve-bootstrap-DzVkpLbDknW