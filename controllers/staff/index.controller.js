const { response, query } = require('express');
const { render } = require('pug');
const db = require('../../models/database');


exports.get_landingPage = async(req, res)=>{
    return res.render('./landing_page.pug');
}
exports.get_homePage = async (req, res) => {   //======================= oke ========================
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

                        return res.render('./dashboard.pug',{products: products});
                    }
                })
            })
    }
    catch (error) {
        console.log("error")
        res.status(200).json(error);

    }
}
exports.get_login = async (req, res)=>{
    return res.render('./login_page.pug');
}
exports.post_login = async (req, res) => {
    let arrParams = [req.body.username , req.body.password]
    console.log(arrParams);
    const sql = 'SELECT count(*) as count FROM `staff` as s where s.username = ? and s.password = ?';
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        db.closeDB(conection);    
                        console.log(result);
                        if(parseInt(result[0].count) == 1)
                        {
                            return res.redirect('/trang_chu')
                        }
                        else
                        {
                            return res.render('./login_page.pug')
                        }   
                    }
                })
            })
    }
    catch (error) {
        console.log("error")
        res.status(200).json(error);
    }

}
exports.get_signin = async (req, res)=>{
    return res.render('./signin_page.pug');
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
        console.log("error : cập nhật kho hàng thất bại")
        return res.status(200).json(error);
       
    }
}
exports.get_update_quantity = async (req , res) =>{
    return res.render('./update-warehouse.pug');
}
// // lấy danh sách các món ăn ở trang thực đơn
exports.get_menu = async (req, res) => {   
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


exports.get_add_food = async ( req , res) =>{
    return res.render('./menu-insert.pug');
}

//thêm mới món ăn
exports.post_add_food = async (req, res) => { //================= oke =======================
    const { name, price, type, description , image_link } = req.body;
  
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

exports.get_statistical = async(req,res)=>{
    return res.render('./statistical.pug')
}


exports.post_statistical_day = async(req,res)=>{
    console.log(req.body.date);
    let arrParams =[req.body.date];

    const sql = 'select b.product_id , p.product_name , p.price ,count(*) as SoLuong , SUM(p.price) as'
            +' TongTien , (DATE(bill.date_created)) as Ngay from bill_order_detail as b , product as p , bill_order as bill'
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
                                    item.Ngay = req.body.date;
                                })
                               
                                let products = result;

                                console.log(total);
                               
                                return res.render('./statistical_day.pug', {products:products , total : total});
                            }
                        })
                    })
            }
            catch (error) {
                console.log("error")
                res.status(200).json(error);
                s
            }
}
exports.get_statistical_month = async(req,res)=>{
    let today = new Date();

    const sql = 'CALL `thongKe`(?)'
            try {
                db.connectDB()
                    .then((conection) => {
                        conection.query(sql,[today.getFullYear()], function (err, result, fields) {
                            if (err) throw err;
                            else {
                                db.closeDB(conection);
                                let array_EachMonth = [] , i = 0 ;
                                result.map((item)=>{
                                    i++
                                    if(i<=12)
                                    {
                                        if(item[0].total == null){array_EachMonth.push(0);}
                                        else{array_EachMonth.push(item[0].total);}
                                    }     
                                })
                                console.log(array_EachMonth);
                                return res.render('./statistical_month.pug',
                                {
                                    array_EachMonth : array_EachMonth,
                                    year: today.getFullYear()
                                });
                              
                            }
                        })
                    })
            }
            catch (error) {
                console.log("error")
                res.status(200).json(error);
            }
}
