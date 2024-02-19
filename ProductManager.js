import fs from "fs/promises";

class ProductManager {
  constructor() {
    this.path = "productos.json";
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
      stock: product.stock,
    };
    products.push(newProduct);
    this.saveProductsToFile(products);
    return newProduct;
  }

  async getProducts() {
    try {
      const fileContent = await fs.readFile(this.path, { encoding: "utf-8" });

      if (!fileContent || fileContent.trim() === "") {
        // El archivo está vacío o es undefined, devuelve un array vacío
        return [];
      }

      let products = JSON.parse(fileContent);
      return products;
    } catch (error) {
      console.error("Error en getProducts:", error);
      throw error;
    }
  }

  async getProductById(id) {
    const products = await this.getProductsFromFile();
    const foundProduct = products.find(product => product.id === id);
    return foundProduct || null;
}

  updateProduct(id, updatedFields) {
    const products = this.getProductsFromFile();
    const indexToUpdate = products.findIndex((product) => product.id === id);

    if (indexToUpdate !== -1) {
      // Update fields without changing the ID
      products[indexToUpdate] = {
        ...products[indexToUpdate],
        ...updatedFields,
      };
      this.saveProductsToFile(products);
      return products[indexToUpdate];
    }

    return null; // Product not found
  }

  deleteProduct(id) {
    const products = this.getProductsFromFile();
    const updatedProducts = products.filter((product) => product.id !== id);
    this.saveProductsToFile(updatedProducts);
  }

  generateUniqueId() {
    const products = this.getProductsFromFile();
    const lastProduct = products[products.length - 1];
    return lastProduct ? lastProduct.id + 1 : 1;
  }
  
  
  async getProductsFromFile() {
    try {
        const fileContent = await fs.readFile(this.path, 'utf-8');

        if (!fileContent || fileContent.trim() === '') {
            // El archivo está vacío o es undefined, devuelve un array vacío
            return [];
        }

        // Parsear el contenido del archivo a un array
        const products = JSON.parse(fileContent);

        // Verificar si es un array
        if (!Array.isArray(products)) {
            console.error("Error en getProductsFromFile: El contenido del archivo no es un array.");
            return [];
        }

        return products;
    } catch (error) {
        // Si hay un error al parsear el JSON, devuelve un array vacío
        console.error("Error en getProductsFromFile:", error);
        return [];
    }

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
  let products = this.getProductsFromFile();
  products = products.filter(product => product.id !== id);
  this.saveProductsToFile(products);
}
  saveProductsToFile(products) {
    fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");
  }
}

export default ProductManager;
