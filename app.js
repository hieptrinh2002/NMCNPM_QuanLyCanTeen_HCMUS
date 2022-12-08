const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001;
//const apiPath = '/api/';

app.use(express.json());
app.use(express.urlencoded());

// website -- main page
app.use(express.static('views'));


// ================== routers =======================================
app.use('/api', require("./routes/api.route"));//+ 'users'
app.use('/', require('./routes/staff/index.route'));

// app.use('/staff')


app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
})



/* ============== Routes =============== */
// app.use('/init-system', initSystemRoute);
// app.use('/api', apiRoute);
// app.use('/auth', authRoute);
// app.use('/admin', adminAuthorizationMiddleware, passSidebarStatus, adminRoute);
// app.use(
// 	'/management',
// 	mgmtAuthorizationMiddleware,
// 	passSidebarStatus,
// 	managementRoute
// );
// app.use('/user', userAuthorizationMiddleware, userRoute);
// app.use('/', homeRoute);


app.listen(port, function () {
    const host = 'localhost';
    console.log('Example app listening at http://%s:%s', host, port);
});




















//https://www.youtube.com/watch?v=wuU_DfdTZOA

//nodejs - https://viblo.asia/p/nodejs-bai-3template-engines-voi-ham-render-va-viet-ma-html-voi-pug-WAyK8dj9KxX


// video quan trọng
//https://viblo.asia/p/bai-1-bootstrap-la-gi-gioi-thieu-ve-bootstrap-DzVkpLbDknW