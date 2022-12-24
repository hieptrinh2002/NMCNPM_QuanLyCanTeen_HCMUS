const db = require("../models/database")
let POINT = 0;
let TOTAL = 0;
let USER;
let CART;
const chooseMethod = async (req, res) => {
    CART = req.session.cart;
    USER = res.locals.user;
    for (let i = 0; i < CART.length; i++) {
        TOTAL += CART[i].price * CART[i].qty;
    }
    res.render('payment/select_payment', {
        title: 'Thanh toán',
        cart: CART,
        total: TOTAL
    })

}
const Payment = async (req,res,next)=>{
    let cus_num = req.body;
    let id = req.params.id;
    let cart = req.session.cart;
    let action = req.query.action;
    let newMon = TOTAL;
    db.connectDB()
    .then((result) => {
        result.query('SELECT money_available FROM customer WHERE id_cart =?',[cus_num],(err,data)=>{
            if(err) throw err;
            else{
                if(data.length >=0){
                    let sqlPoint = '';
                    if (data >=  newMon) {
                        newMon -= data;
                        sqlPoint = ' UPDATE customer SET money_available =' + newMon.toString() + ' WHERE id_card = ?;'
                        let insertOrder = 'INSERT INTO bill_order(total_money,status,staff_id) VALUES(?,?,?,?,?);' + sqlPoint;
                        result.query(insertOrder, [TOTAL,1,USER.staff_id,cus_num], (err, results) => {
                            if (err) throw err;
                            let orderID = results[0].insertId;
                            let cart = CART;
                            let insertItem = 'INSERT INTO bill_order_detail(product_id, bill_order_id, total_money, quantity) VALUES ?';
                            let items = [];
                            for (let i = 0; i < cart.length; i++) {
                                items.push([cart[i].id, orderID, cart[i].price * cart[i].qty, cart[i].qty]);
                            }
                            connection.query(insertItem, [items], (err, results) => {
                                if (err) throw err;
                                res.render('payment/success_cash', {
                                    title: 'Thành công',
                                    user: USER
                                })
                            })
                        })
                    } else {
                        res.status(200).json({trangthai: 0})
                    }
                    
                }
                else{
                    res.status(200).json({trangthai: -1})
                }

            }
        })
    }).catch((error) => {
        console.log(error);
        res.status(200).json(error)
    });

}


module.exports = {
    chooseMethod,
    Payment
}