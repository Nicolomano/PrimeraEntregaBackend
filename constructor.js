class ProductManager{
    constructor(title, description, price, thumbnail, code, stock){
        this.title= title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock,
        //Array vacio
        this.products = []
        //Inicio ID autoincrementable
        this.nextId = 1
    }

    addProduct(product){
        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
            console.error("Todos los campos son obligatorios");
            return
        }

        if (this.products.some(existingProduct => existingProduct.code === product.code)){
            console.error("Codigo ya existente")
            return
        }

        const newProduct ={
            id: this.nextId++,
            title : product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock
        }

        this.products.push(newProduct);

        console.log("producto agregado:", newProduct);

    }

    getProducts() {
        return this.products
    }

    getProductById(id){
        const foundProduct= this.products.find (product => product.id === id)
        if(foundProduct){
            return foundProduct
        }else{
            console.error("Not Found, id:", id)
        }
    }
}

//Ejemplo
const productManager = new ProductManager
//agregar algunos productos
const product1 = ({title:"Hojas a4",description: "Block de hojas A4",price: 500,thumbnail: "./assets/hojas A4.jpg",code: "A001",stock: 10});
const product2 = ({title:"Lapicera bic 2",description: "Lapicera birome bic trazo fino", price: 800, thumbnail: "./assets/bic.jpg",code: "A002",stock: 100})
productManager.addProduct(product1)
productManager.addProduct(product2)

//obtener todos los productos
const allProducts = productManager.getProducts()

console.log("Todos los productos:", allProducts);

//obtener producto por id

const idToFind= 2;
const foundPorduct = productManager.getProductById(idToFind)
console.log("producto encontrado mediante Id: ",foundPorduct);

//intento de obtener id inexistente

const nonExistentId= 823;
productManager.getProductById(nonExistentId)

