// const { response, query } = require('express');
// const { render } = require('pug');
const db = require('../../models/database');


exports.get_landingPage = async(req, res)=>{
    return res.render('./landing_page.pug');
}


// lấy danh sách nhân viên
exports.get_staffs = async (req, res) => {   //======================= oke ========================
    if(res.locals.user == null)
    {
        res.redirect('/');
    }
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
    if(res.locals.user == null)
    {
        res.redirect('/');
    }
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
                        return res.render('./customer.pug',{customers: customers });
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
    if(res.locals.user == null)
    {
        res.redirect('/');
    }
    let arrParams = [];
    const sql = 'SELECT * FROM `product` WHERE status = 1'
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);
                        result.map((item) => {
                            if(item.product_type == 1)
                            {
                                item.product_type = "hàng tiêu dùng"
                            }
                            else{
                                item.product_type = "thức ăn trong ngày"
                            }
                            if(item.status == 1)
                            {
                                item.status = "đang bán"
                            }
                            else
                            {
                                item.status = "ngưng bán"
                            }
                        })
                        let products = result;

                        return res.render('./warehouse.pug',{products: products});
                    }
                })
            })
    }
    catch (error) {
        console.log("error warehouse.pug")
        return res.status(200).json(error);
    }
}

// // lấy danh sách các món ăn ở trang thực đơn
exports.get_menu = async (req, res) => {   
    if(res.locals.user == null)
    {
        res.redirect('/');
    }
    let arrParams = [];
    const sql = 'SELECT * FROM `product` WHERE 1'
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);   
                        result.map((item) => {
                            if(item.product_type == 1)
                            {
                                item.product_type = "hàng tiêu dùng"
                            }
                            else{
                                item.product_type = "thức ăn trong ngày"
                            }
                            if(item.status == 1)
                            {
                                item.status = "đang bán"
                            }
                            else
                            {
                                item.status = "ngưng bán"
                            }
                        })     
                        let products = result;
                        return res.render('./menu.pug',{products: products});
                    }
                })
            })
    }
    catch (error) {
        console.log("error")
        return res.status(200).json(error);
    }
}

exports.post_reset = async (req , res) =>{
    const sql = 'update product set quantity_available = 0 where product_type = 0';
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);
                        return res.redirect('/thuc_don');
                    }
                })
            })
    }
    catch (error) {
        console.log("error")
        res.status(200).json(error);
    }

}

exports.get_add_food = async ( req , res) =>{
    if(res.locals.user == null)
    {
        res.redirect('/');
    }
    return res.render('./menu-insert.pug');
}
//thêm mới món ăn
exports.post_add_food = async (req, res) => { //================= oke =======================
    const { name, price, type, description , image_link , quantity_available } = req.body;
  
    console.log({ name, price, type, description , image_link , quantity_available });
    let arrParams = ['NULL', name, type, description , image_link , 1, price, quantity_available];
    const sql = 'INSERT INTO `product` (`product_id`, `product_name`, `product_type`, `description`, `image_link`, `status`, `price`, `quantity_available`) VALUES (?,?,?,?,?,?,?,?)';
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);
                        return res.redirect('/thuc_don');
                    }
                })
            })
    }
    catch (error) {
        console.log("error")
        res.status(200).json(error);
    }
}
// tạo thẻ khách hàng
exports.post_Create_Card = async (req, res) => { 
    let arrParams = [
        req.body.fullname,
        req.body.phone,
        req.body.money,
        req.body.email,
        Math.floor(Math.random() * 99999999 + 10000000) 
    ]
    console.log(arrParams);

    const sql = 'INSERT INTO `customer` (`customer_id`, `fullname`, `phone`, `money_available`, `email`, `id_card`) VALUES (NULL,?,?,?,?,?)';
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);

                        return res.redirect('/khach_hang');
                    }
                })
            })
    } catch (error) {
        console.log("error")
        return res.status(200).json(error);
    }
}
exports.get_Create_Card = async ( req , res) =>{
    if(res.locals.user == null)
    {
        res.redirect('/');
    }
    return res.render('./createcard.pug');
}

// khách hàng nạp tiền
exports.get_add_money = async (req , res ) =>{
    if(res.locals.user == null)
    {
        res.redirect('/');
    }
    return res.render('./recharge.pug');
}
// khách hàng nạp tiền
exports.post_add_money = async (req , res ) =>{
    let arrParams = [req.body.money , req.params.id]; // id , số lượng thêm 
    console.log(arrParams);
    let sql ='UPDATE `customer` SET `money_available` = `customer`.money_available + ?  WHERE `customer`.`customer_id` = ?'

    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);
                        return res.redirect('/khach_hang');
                    }
                })
            })
    } catch (error) {
        console.log("error")
        res.status(200).json(error);
    }
}
