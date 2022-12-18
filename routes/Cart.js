module.exports = class Cart{
    constructor() {
        this.items = [];
        this.totalQuantity = 0;
        this.totalPrice = 0;
    }
    save(item){
        //If the cart is empty, add item in cart
        if(this.items.length === 0){
            item.qty = 1;
            item.sumPrice = item.price;
            this.items.push(item);
            this.totalQuantity+=1;
            this.totalPrice+=item.price;
        }else{
            // Find the product
            const existItemIndex = this.items.findIndex((p)=> p.id == item.id)
            if(existItemIndex>=0){
                this.items[existItemIndex].qty +=1;
                this.items[existItemIndex].sumPrice += item.price;
                this.totalPrice += this.items[existItemIndex].price;
                this.totalQuantity += 1;
            }
            // Dont't have product in cart
            else{
                item.qty = 1;
                item.sumPrice = item.price;
                this.items.push(item);
                this.totalQuantity +=1;
                this.totalPrice += item.price;
            }
        }
    }
    update(id,quantity){
        const existItemIndex = this.items.findIndex((p)=>p.id === id);
        if(existItemIndex >= 0){
            const phanChenhLech = parseInt(this.items[existItemIndex.qty - quantity]);
            // Increase Quantity
            if(phanChenhLech < 0){
                this.items[existItemIndex].qty = quantity;
                this.items[existItemIndex].sumPrice += this.items[existItemIndex].price;
                this.totalPrice += this.items[existItemIndex].price;
                this.totalQuantity +=1;
            
            }
            // Decrease quantity
            else if(phanChenhLech > 0){
                this.items[existItemIndex].qty = quantity;
                this.items[existItemIndex].sumPrice -=this.items[existItemIndex].price;
                this.totalPrice -= this.items[existItemIndex].price;
                this.totalQuantity -=1;
            }
        }
    }
    delete(id){
        const existItemIndex = this.items.findIndex((p) => p.id === id);
        if(existItemIndex >= 0){
            this.totalQuantity -= this.items[existItemIndex].qty;
            this.totalPrice -= this.items[existItemIndex].price;
            if(existItemIndex == 0){
                this.items.shift();
            }
            else if (existItemIndex == this.items.length - 1){
                this.items.pop();
            }
            else{
                let firstTemp = this.items.slice(0,existItemIndex);
                let secondTemp = this.items.slice(existItemIndex + 1,this.items.length);
                this.items.length = 0;
                const newList = firstTemp.concat(secondTemp);
                this.items = newList;
            }
        }
    }
}