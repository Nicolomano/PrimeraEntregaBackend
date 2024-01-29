const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct(product) {
        const products = this.getProductsFromFile();
        const newProduct = {
            id: this.generateUniqueId(),
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock
        };
        products.push(newProduct);
        this.saveProductsToFile(products);
        return newProduct;
    }

    getProducts() {
        return this.getProductsFromFile();
    }

    getProductById(id) {
        const products = this.getProductsFromFile();
        const foundProduct = products.find(product => product.id === id);
        return foundProduct;
    }

    updateProduct(id, updatedFields) {
        const products = this.getProductsFromFile();
        const indexToUpdate = products.findIndex(product => product.id === id);

        if (indexToUpdate !== -1) {
            // Update fields without changing the ID
            products[indexToUpdate] = { ...products[indexToUpdate], ...updatedFields };
            this.saveProductsToFile(products);
            return products[indexToUpdate];
        }

        return null; // Product not found
    }

    deleteProduct(id) {
        const products = this.getProductsFromFile();
        const updatedProducts = products.filter(product => product.id !== id);
        this.saveProductsToFile(updatedProducts);
    }

    generateUniqueId() {
        const products = this.getProductsFromFile();
        const lastProduct = products[products.length - 1];
        return lastProduct ? lastProduct.id + 1 : 1;
    }

    getProductsFromFile() {
        try {
            const fileContent = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            // If the file doesn't exist or is empty, return an empty array
            return [];
        }
    }

    saveProductsToFile(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf-8');
    }
}

module.exports = ProductManager;
