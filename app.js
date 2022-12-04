const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001;
const apiPath = '/api/';

app.use(express.json());
app.use(express.urlencoded());

// website -- main page
app.use(express.static('views'));


// user routers
app.use(apiPath + 'users', require("./routes/user.route"));

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
})

//

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
