const db = require('../models/database');
const Cart = require('../routes/Cart');
const Helper = require('./Helper');

var myCart;

const addtoCart = async (req,res) =>{
    db.connectDB()
    .then((result) => {
        result.query('SELECT * FROM product WHERE product_id ',[req.body.product_id],(err,data)=>{
            if(err) throw err;
            else if (req.session.cart){
                const oldCart = req.session.cart;
                myCart = Helper.Assign(oldCart);
                myCart.save(data[0]);
                req.session.cart = myCart;
            }
            else{
                myCart = new Cart();
                myCart.save(data[0]);
                req.session.cart = myCart;
            }
            res.status(200).json({totalQuantity: myCart.totalQuantity})
        })
    }).catch((error) => {
        console.log(error);
        res.status(200).json(error)
    });
}