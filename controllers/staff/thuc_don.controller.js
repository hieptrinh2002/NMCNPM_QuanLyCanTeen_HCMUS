const { response, query } = require('express');
const { render } = require('pug');
const db = require('../../models/database');

// lấy danh sách các món ăn ở trang thực đơn
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

                        return res.status(200).json("thêm món thành công thành công");
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
