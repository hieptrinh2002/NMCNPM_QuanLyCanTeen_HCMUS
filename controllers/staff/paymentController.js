const db = require('../../models/database')
const mysql = require('mysql')
let POINT = 0;
let TOTAL = 0;
let USER;
let CART;
let trangthai;
let newMon = 0;
const connection = mysql.createPool({
    connectionLimit: 100,
    multipleStatements: true,
    host: '127.0.0.1',
    user: 'root',
    database: 'quanlycantin_nmcnpm',
    port: "3306"
});

function UpdateProduct(id,quantity){
    let sqlText = 'UPDATE `product` SET `quantity_available`=`quantity_available`-'+quantity.toString()+' WHERE product_id = ?;'
    try{
        connection.query(sqlText,[id],(err,result)=>{
            if(err) throw err;
            console.log(result);
        })

    }catch(err){
        console.log(error);
        res.status(200).json(error)
    }
}
const chooseMethod = async (req, res,next) => {
    CART = req.session.cart;
    USER = res.locals.user;
    console.log(USER)
    for (let i = 0; i < CART.length; i++) {
        TOTAL += CART[i].price * CART[i].qty;
    }
    res.render('../views/payment', {
        title: 'Thanh toán',
        cart: CART,
        total: TOTAL,
        trangthai: trangthai
    })

}
const Payment = async (req,res,next)=>{
    let cus_num = parseInt(req.body.cus_id);
    let status = 1;
    console.log("Gia tri cua ma khach",cus_num);
    newMon = TOTAL;
    console.log("Xuat")
    console.log(newMon);
    try{
        connection.query('SELECT* FROM customer',(err,result)=>{
            if(err) throw err;
            let temp = 0;
            for(let i = 0; i <result.length;i++)
            {
                if(result[i].id_card == cus_num)
                {
                    temp = 1;
                }
            }
            if(temp == 0)
            {
                res.render('../views/unsuccess', {
                    trangthai: -1,
                    user: USER
                })
            }
            else{
                connection.query('SELECT money_available,customer_id FROM customer WHERE id_card = ?',[cus_num],(err,data)=>{    
                    if(data.length >=0){
                        let sqlPoint = '';
                        console.log(data[0])
                        if (data[0].money_available >=  newMon) {
                            newMon = data[0].money_available - newMon;
                            sqlPoint = "UPDATE customer SET money_available = "+newMon.toString()+ " WHERE customer_id = ?;";
                            connection.query(sqlPoint,[data[0].customer_id], (err, results) => {
                                if (err) throw err;
                                else{
                                    let insertOrder = 'INSERT INTO bill_order(total_money,status,staff_id,customer_id) VALUES(?,?,?,?);';
                                    connection.query(insertOrder,[TOTAL,status,USER.staff_id,data[0].customer_id], (err, data1) => {
                                        if (err) throw err;
                                        console.log(data1);
                                        let orderID = data1.insertId;
                                        console.log(orderID)
                                        let cart = CART;
                                        let insertItem = 'INSERT INTO bill_order_detail(product_id, bill_order_id, total_money, quantity) VALUES ?;'
                                        let items = [];
                                        for (let i = 0; i < cart.length; i++) {
                                            items.push([cart[i].id, orderID, cart[i].price * cart[i].qty, cart[i].qty]);
                                            UpdateProduct(cart[i].id,cart[i].qty);
                                        }
                                        connection.query(insertItem, [items], (err, results) => {
                                            if (err) throw err;
                                            console.log(results);
                                            res.render('../views/success', {
                                                trangthai: 0,
                                                user: USER
                                            })
                                        })
                                    })
                                }
                            })        
                        } else {
                            res.render('../views/unsuccess', {
                                trangthai: 1,
                                user: USER
                            })
                        }   
                    } 
                })
            }
        })
    }catch(error){
        console.log(error);
        res.status(200).json(error)
    };

}


module.exports = {
    chooseMethod,
    Payment
}