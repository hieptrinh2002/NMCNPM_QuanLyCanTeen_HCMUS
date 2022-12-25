const db = require('../../models/database');
// gửi yêu cầu cập nhật kho hàng với id , số lượng thêm ?---
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
    if(res.locals.user == null)
    {
        res.redirect('/');
    }
    return res.render('./update-warehouse.pug');
}