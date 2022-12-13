const { response, query } = require('express');
const { render } = require('pug');
const db = require('../../models/database');
//const API = require('../api.controller')

exports.get_demo = async (req, res) => {
    //console.log(req.query);
    //console.log(req.params);
    //console.log(req.body);
    var postAPI = 'http://localhost:5001/api/customers';
    fetch(postAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (customers) {
            //console.log(customers);
            res.render('./customer.pug', { customers: customers });
        })

    //res.render('./customer.pug', { customers: customers });

}
// lấy danh sách nhân viên
exports.get_staffs = async (req, res) => {   //======================= oke ========================
    let arrParams = [];
    const sql = 'SELECT * FROM `staff` WHERE 1'
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);

                        let staffs = result;
        
                        return res.render('./staff.pug',{staffs: staffs});
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
// lấy danh sách khách hàng 
exports.get_customers = async (req, res) => {   //======================= oke ========================
    let arrParams = [];
    const sql = 'SELECT * FROM `customer` WHERE 1'
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);

                        let customers = result;
                        //console.log(customers);
                        //return res.status(200).json("render kho hàng thành công");
                        return res.render('./customer.pug',{customers: customers});
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

// lấy danh sách kho hàng ( các loại đồ uống đóng chai )
exports.get_store = async(req , res) =>{
    const sql = 'SELECT * FROM `product` WHERE product_type = 1 and status = 1'
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, function (err, result, fields) {
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
                                link_image: row.image_link,
                                status: row.status,
                                price: row.price,
                                quantity_availble: row.quantity_availble
                            })
                        })

                        console.log(products);

                        return res.status(200).json("render kho hàng thành công");
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


// lấy ra danh sách sản phẩm trong kho hàng
exports.get_wavehouse = async(req , res)=>{
    let arrParams = [];
    const sql = 'SELECT * FROM `product` WHERE product_type = 1'
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);
                        let products = result;
                        //return res.status(200).json("render kho hàng thành công");
                        return res.render('./warehouse.pug',{products: products});
                    }
                })
            })
    }
    catch (error) {
        console.log("error")
        res.status(200).json(error);
        ///return res.render('link giao dien',{notification:"render kho hàng failed"})
    }
}
// gửi yêu cầu cập nhật kho hàng với id , số lượng thêm ?---
exports.post_update_quantity = async(req , res)=>{
    let arrParams = [req.params.id ]; // số lượng thêm
    let sql = 'UPDATE `product` SET `quantity_availble` = 50 WHERE `product`.`product_id` = ?;'
    console.log(arrParams);
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);
                                               
                        //return res.render('link giao dien',{notification:"create card successful"})

                        //return res.render('./demo.pug')// render thử file .pug
                        // var users = [{ name: "User1", email: "user1@gmail.com" }, { name: "User2", email: "user2@gmail.com" }
                        return res.render('./warehouse.pug');//, { users: users });
                    }
                })
            })
    } catch (error) {
        console.log("error")
        res.status(200).json(error);
        ///return res.render('link giao dien',{notification:"create card fail"})
    }
}

// // lấy danh sách các món ăn ở trang thực đơn
exports.get_menu = async (req, res) => {   //======================= oke ========================
    let arrParams = [];
    const sql = 'SELECT * FROM `product` WHERE 1'
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);

                        let products = result;
                        // result.map((row) => {
                        //     products.push({
                        //         product_id: row.product_id,
                        //         product_name: row.product_name,
                        //         product_type: row.product_type,
                        //         desctription: row.desctription,
                        //         link_image: row.image_link,
                        //         status: row.status,
                        //         price: row.price,
                        //         quantity_availble: row.quantity_availble
                        //     })
                        // })

                        //console.log(products);
                        //return res.status(200).json("render kho hàng thành công");
                        return res.render('./menu.pug',{products: products});
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

exports.get_add_food = async ( req , res) =>{
    return res.render('./menu-insert.pug');
}

//thêm mới món ăn
exports.post_add_food = async (req, res) => { //================= oke =======================
    const { name, price, type, description } = req.body;
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.price);
    // console.log(req.body.type);
    // console.log(req.body.description);
    //console.log({name, price, type, description});
    //console.log(req.body.name);

    let arrParams = ['NULL', name, type, description , 'NULL', 1, price, 0];
    const sql = 'INSERT INTO `product` (`product_id`, `product_name`, `product_type`, `description`, `image_link`, `status`, `price`, `quantity_availble`) VALUES (?,?,?,?,?,?,?,?)';
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);
                        
                        //return res.status(200).json("thêm món thành công thành công");
                        //return res.status(200).json({notification:"add food successful !!"})
                        //return res.render('./menu-insert.pug');
                        return res.redirect('/thuc_don');
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

exports.post_Create_Card = async (req, res) => { // =================  oke  ======================================
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