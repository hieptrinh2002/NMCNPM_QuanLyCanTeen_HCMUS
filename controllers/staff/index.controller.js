const { response, query } = require('express');
const { render } = require('pug');
const db = require('../../models/database');
//const API = require('../api.controller')



exports.get_demo = async (req, res) => {
    // console.log(req.query);
    // console.log(req.params);
    // console.log(req.body);
    // var postAPI = 'http://localhost:5001/api/customers';
    // fetch(postAPI)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (customers) {
    //         //console.log(customers);
    //         res.render('./customer.pug', { customers: customers });
    //     })

    let Ngay = req.query.Ngay;
    console.log(Ngay);
    let arrParams =[Ngay];
    const sql = 'select b.product_id , p.product_name ,count(*) as SoLuong , SUM(p.price) as'
            +' TongTien from bill_order_detail as b , product as p , bill_order as bill'
            +' where b.product_id = p.product_id and DATE(bill.date_created) = ?'
            +' GROUP BY b.product_id , p.product_name'
            try {
                db.connectDB()
                    .then((conection) => {
                        conection.query(sql, arrParams, function (err, result, fields) {
                            if (err) throw err;
                            else {
                                db.closeDB(conection);
                                console.log(result);
                                let total = 0;
                                result.map((item)=>{
                                    total+=item.TongTien;
                                })
                                console.log(total);
                                return res.status(200).json(result);
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
    let arrParams = [];
    const sql = 'SELECT * FROM `product` WHERE product_type = 1 and status = 1'
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
    let arrParams = [req.body.quantity,req.params.id]; // id , số lượng thêm 
    console.log(arrParams);
    let sql = 'UPDATE `product` SET `quantity_available` = `product`.quantity_available + ? WHERE `product`.`product_id` = ?;'
    console.log(arrParams);
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);

                        return res.redirect('/kho_hang');
                    }
                })
            })
    } catch (error) {
        console.log("error")
        res.status(200).json(error);
        ///return res.render('link giao dien',{notification:"create card fail"})
    }
}

exports.get_update_quantity = async (req , res) =>{
    //console.log(req.params.id)
    return res.render('./update-warehouse.pug');
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
                        //         quantity_availble: row.quantity_avaialble
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
    const { name, price, type, description , image_link } = req.body;
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.price);
    console.log(req.body.type);
    console.log(req.body.description);
    console.log(req.body.image_link);

    console.log({ name, price, type, description , image_link });
    let arrParams = ['NULL', name, type, description , image_link , 1, price, 0];
    const sql = 'INSERT INTO `product` (`product_id`, `product_name`, `product_type`, `description`, `image_link`, `status`, `price`, `quantity_available`) VALUES (?,?,?,?,?,?,?,?)';
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

// tạo thẻ khách hàng
exports.post_Create_Card = async (req, res) => { // =================  oke  ======================================
    const { fullname, email, phone, address, money } = req.body;
    let arrParams = [
        req.body.fullname,
        req.body.phone,
        req.body.money,
        req.body.email,
        Math.floor(Math.random() * 99999999 + 10000000) // test , cần điều chỉnh
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

                        //return res.redirect('/khach_hang');
                    }
                })
            })
    } catch (error) {
        console.log("error")
        res.status(200).json(error);
        ///return res.render('link giao dien',{notification:"create card fail"})
    }
}

exports.get_Create_Card = async ( req , res) =>{
    return res.render('./createcard.pug');
}

// khách hàng nạp tiền
exports.get_add_money = async (req , res ) =>{
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