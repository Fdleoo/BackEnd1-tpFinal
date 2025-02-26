import CartModel from "../models/cart.model.js"


class CartManager {
    async createCart(){
        try {
            const newCart = new CartModel({ products: []})
            await newCart.save();
            return newCart;
        } catch (error) {
            console.log("Recorcholis, hubo un fallo al craer nuevo cart", error)
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await CartModel.findById(cartId);
            if(!cart){
                console.log("No encontramos un carrito con ese id");
                return null;
            }
            return cart;
        } catch (error) {
            console.log("Rayos, no pudimos traer el carrito", error)
        }
    }

    async addProductToCart(cartId, productId, quantity = 1){
        try {
            const cart = await this.getCartById(cartId); // TODO quiza this por cartmodel
            const existeProducto = cart.products.find(item => item.product.toString() === productId);

            if(existeProducto){
                existeProducto.quantity += quantity;
            }
            else{
                cart.products.push({product : productId, quantity});
            }

            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            console.log("Eror al agregar producto al carrito, que barbaro", error);
        }
    }

    async removeCartProduct(cartId, productId){
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart){
                throw new Error('Carrito no encontrado');
            }
            cart.products = cart.products.filter(item => item.product._id.toString() !== productId);
            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al eliminar producto del carrito', error);
            throw error;
        }
    }

    async updateCart(cartId, updatedProducts) {
        try {
            const cart = await CartModel.findById(cartId);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            cart.products = updatedProducts;

            cart.markModified('products');

            await cart.save();

            return cart;
        } catch (error) {
            console.error('Error al actualizar el carrito en el gestor', error);
            throw error;
        }
    }

    async updateQuantityProduct(cartId, productId, newQuantity){
        try {
            const cart = await CartModel.findById(cartId);
            if(!cart){
                throw new Error("carrito no encontrado");
            }

            const productIndex = cart.products.findIndex(item => item.product._id.toString() === productId);
            if(productIndex !== -1){
                cart.products[productIndex].quantity = newQuantity;
                cart.markModified('products');
                await cart.save();
                return cart;
            } else{
                throw new Error('Producto no encontrado en el carrito');
            }
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto en el carrtio, caspitas', error);
            throw error;
        }
    }

    async clearCart(cartId) {
        try {
            const cart = await CartModel.findByIdAndUpdate(
                cartId,
                { products: [] },
                { new: true }
            );

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            return cart;
        } catch (error) {
            console.error('Error al vaciar el carrito en el gestor', error);
            throw error;
        }
    }
} 

export default CartManager;





/* (cartId, productId, quantity = 1) {
    try {
        const carrito = await this.getCarritoById(cartId);
        const existeProducto = carrito.products.find(item => item.product.toString() === productId);

        if (existeProducto) {
            existeProducto.quantity += quantity;
        } else {
            carrito.products.push({ product: productId, quantity });
        }

        //Vamos a marcar la propiedad "products" como modificada antes de guardar: 
        carrito.markModified("products");

        await carrito.save();
        return carrito;

    } catch (error) {
        console.log("error al agregar un producto", error);
    }
} */ //!profe



/*     (cartId, productId, quantity = 1){
        try {
            const cart = await this.getCartById(cartId); // TODO quiza this por cartmodel
            const existeProducto = cart.products.find(item => item.product.toString() === productId);

            if(existeProducto){
                existeProducto.quantity += quantity;
            }
            else{
                cart.products.push({product : productId, quantity});
            }

            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            console.log("Eror al agregar producto al carrito, que barbaro", error);
        }
    } */ //!mio