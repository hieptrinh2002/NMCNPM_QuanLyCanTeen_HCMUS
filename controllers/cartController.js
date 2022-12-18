const Helper = require('./Helper');

const showCart = async (req,res) => {
    const cart = req.session.cart;
    res.render('cart',{cart});
}

const updateCart = async (req,res) => {
    const params = req.body.itemQty.split('/');
    const productID = parseInt(params[1]);
    const quantity = parseInt(params[0]);
    const oldCart = req.session.cart;
    const newCart = Helper.Assign(oldCart);

    newCart.update(productID,quantity);
    req.session.cart = newCart;

    const cart = req.session.cart;
    res.render('cart',{cart});
}

const deleteItem = async (req,res) =>{
    const itemID = req.params.id;
    const oldCart = req.session.cart;
    const newCart = Helper.Assign(oldCart);
    newCart.delete(itemID);
    req.session.cart = newCart;

    res.redirect('/cart');
}