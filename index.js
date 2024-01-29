const ProductManager = require('./ProductManager');

const productManager = new ProductManager('productos.json'); // Reemplaza 'productos.json' con el nombre que desees para tu archivo de persistencia

// Ejemplo de uso
const product1 = { title: "Hojas a4", description: "Block de hojas A4", price: 500, thumbnail: "./assets/hojas A4.jpg", code: "A001", stock: 10 };
const product2 = { title: "Lapicera bic 2", description: "Lapicera birome bic trazo fino", price: 800, thumbnail: "./assets/bic.jpg", code: "A002", stock: 100 };

productManager.addProduct(product1);
productManager.addProduct(product2);

const allProducts = productManager.getProducts();
console.log("Todos los productos:", allProducts);

const idToFind = 2;
const foundProduct = productManager.getProductById(idToFind);
console.log("Producto encontrado mediante ID:", foundProduct);

const updatedProduct = productManager.updateProduct(idToFind, { price: 900, stock: 120 });
console.log("Producto actualizado:", updatedProduct);

productManager.deleteProduct(idToFind);
console.log("Producto eliminado");

const remainingProducts = productManager.getProducts();
console.log("Productos restantes:", remainingProducts);
