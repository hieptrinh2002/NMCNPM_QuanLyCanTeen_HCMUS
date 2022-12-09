const { response } = require('express');
const db = require('../../models/database');


exports.get_demo = async (red, res) => {
    var postAPI = 'http://localhost:5001/api/customers';
    fetch(postAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (customers) {
            console.log(customers);
            res.render('./customer.pug', { customers: customers });
        })

}
// lấy danh sách các món ăn ở trang thực đơn
exports.get_menu = async (req, res) => {
    const sql = 'SELECT * FROM `product` WHERE 1'
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);

                        let products = [];
                        result.map((row) => {
                            products.push({
                                product_id: row.product_id,
                                product_name: row.product_name,
                                product_type: row.product_type,
                                desctription: row.desctription,
                                link_image: row.link_image,
                                status: row.status,
                                price: row.price,
                                quantity_availble: row.quantity_availble
                            })
                        })
                        return res.status(200).json("render thực dơn thành công");
                        //return res.render('link giao dien',{products: products});
                    }
                })
            })
    }
    catch (error) {
        console.log("error")
        res.status(200).json(error);
        ///return res.render('link giao dien',{notification:"render menu failed"})
    }
}



//thêm mới món ăn
exports.post_add_food = async (req, res) => {
    const { name, price, type, desctription } = req.body;
    console.log(req.body);
    let arrParams = ['NULL', name, type, desctription, 'NULL', 1, price, 0];
    const sql = 'INSERT INTO `product` (`product_id`, `product_name`, `product_type`, `desctription`, `image_link`, `status`, `price`, `quantity_availble`) VALUES (?,?,?,?,?,?,?,?)';
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);

                        return res.status(200).json("tạo thẻ thành công");
                        //return res.render('link giao dien',{notification:"add food successful !!"})

                    }
                })
            })
    }
    catch (error) {
        console.log("error")
        res.status(200).json(error);
        ///return res.render('link giao dien',{notification:"add food fail"})
    }
}

exports.post_Create_Card = async (req, res) => {
    const { fullname, email, phone, address, money } = req.body;
    // console.log(req.body);
    // console.log({ fullname, email, phone, address, money });
    // console.log(fullname);
    let arrParams = [
        req.body.fullname,
        req.body.phone,
        req.body.money,
        req.body.email,
        Math.floor(Math.random() * 99999999 + 10000000) // test , cần điều chỉnh
    ]
    const sql = 'INSERT INTO `customer` (`customer_id`, `fullname`, `phone`, `money_available`, `email`, `id_card`) VALUES (NULL,?,?,?,?,?)';
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);

                        return res.status(200).json("tạo thẻ thành công");
                        //return res.render('link giao dien',{notification:"create card successful"})

                        //return res.render('./demo.pug')// render thử file .pug
                        // var users = [{ name: "User1", email: "user1@gmail.com" }, { name: "User2", email: "user2@gmail.com" }
                        //res.render('./users.pug', { users: users });
                    }
                })
            })
    } catch (error) {
        console.log("error")
        res.status(200).json(error);
        ///return res.render('link giao dien',{notification:"create card fail"})
    }
}