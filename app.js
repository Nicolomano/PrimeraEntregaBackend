import express from "express";
import ProductManager from "./ProductManager.js";
import fs from "fs/promises";

const productManager = new ProductManager("productos.json");
const app = express();
const PORT = 8080;

app.get("/products", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.send(products);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/products/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        if (isNaN(productId)) {
            res.status(400).send("Invalid product ID");
            return;
        }

        const product = await productManager.getProductById(productId);

        if (product) {
            res.send(product);
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});
app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
});