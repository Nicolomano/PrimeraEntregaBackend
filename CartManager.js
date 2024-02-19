import fs from "fs";

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async createCart() {
        const newCart = {
            id: this.generateUniqueId(),
            products: []
        };
        await this.saveCartToFile(newCart);
        return newCart;
    }

    async getCartById(cartId) {
        const carts = await this.getCartsFromFile();
        console.log("Carts:", carts);
        return carts.find(cart => cart.id === cartId);
    }
    

    async addProductToCart(cartId, productId) {
        const cart = await this.getCartById(cartId);
        if (!cart) {
            throw new Error("Cart not found");
        }
        const updatedCart = {
            ...cart,
            products: [...cart.products, productId]
        };
        await this.saveCartToFile(updatedCart);
        return updatedCart;
    }

    async saveCartToFile(cart) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(cart, null, 2), 'utf-8');
        } catch (error) {
            console.error("Error saving cart to file:", error);
            throw error;
        }
    }

    async getCartsFromFile() {
        try {
            const fileContent = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            return [];
        }
    }

    generateUniqueId() {
    const randomNumber = Math.floor(Math.random() * Date.now()).toString(16);

    const timestamp = Date.now().toString(16);

    const uniqueId = randomNumber + timestamp;

    return uniqueId;
    }
}

export default CartManager;
