import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                require: true
            },
            quantity: {
                type: Number,
                require: true
            }
        }
    ]
});


//?populate 
cartSchema.pre("findOne", function (next){
    this.populate('products.product', '_id title price stock');
    next();
})

const CartModel = mongoose.model("carts", cartSchema);

export default CartModel;