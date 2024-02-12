import express from "express";
import ProductManager from "./ProductManager.js";

const productRouter = express.Router();
const productManager = new ProductManager();

// Ruta para listar todos los productos
productRouter.get("/", async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productManager.getProducts(limit);
        res.json(products);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Ruta para obtener un producto por su ID
productRouter.get("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Ruta para agregar un nuevo producto
productRouter.post("/", async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;
        // Verificar si todos los campos obligatorios están presentes
        if (!title || !description || !code || !price || !status || !stock || !category) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
        // Crear un nuevo producto
        const newProduct = await productManager.addProduct({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Ruta para actualizar un producto por su ID
productRouter.put("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedFields = req.body;
        // Verificar si el producto existe
        const existingProduct = await productManager.getProductById(productId);
        if (!existingProduct) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        // Actualizar el producto
        const updatedProduct = await productManager.updateProduct(productId, updatedFields);
        res.json(updatedProduct);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Ruta para eliminar un producto por su ID
productRouter.delete("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        // Verificar si el producto existe
        const existingProduct = await productManager.getProductById(productId);
        if (!existingProduct) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        // Eliminar el producto
        await productManager.deleteProduct(productId);
        res.status(204).send(); // Sin contenido
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default productRouter;
