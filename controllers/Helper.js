const Cart = require('../routes/Cart');
const Assign = async (oldCart)=>{
    const newCart = new Cart;
    for(let i = 0; i < oldCart.items.length;i++){
        newCart.items[i] = oldCart.items[i];
    }
    newCart.totalPrice = oldCart.totalPrice;
    newCart.totalQuantity = oldCart.totalQuantity;
    return newCart;
}
module.exports = {
    Assign
}