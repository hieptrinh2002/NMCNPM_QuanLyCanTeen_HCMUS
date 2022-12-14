const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// website -- main page
app.use(express.static('views'));


// set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ================== routers =======================================
app.use('/api', require("./routes/api.route"));//+ 'users'
app.use('/', require('./routes/staff/index.route'));



app.get('/them', (req, res) => {
    res.sendFile(__dirname + "/views_2/adduser.html");
})



app.listen(port, function () {
    const host = 'localhost';
    console.log('Example app listening at http://%s:%s', host, port);
});




















//https://www.youtube.com/watch?v=wuU_DfdTZOA

//nodejs - https://viblo.asia/p/nodejs-bai-3template-engines-voi-ham-render-va-viet-ma-html-voi-pug-WAyK8dj9KxX


// video quan trọng
//https://viblo.asia/p/bai-1-bootstrap-la-gi-gioi-thieu-ve-bootstrap-DzVkpLbDknW