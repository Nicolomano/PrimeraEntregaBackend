// Importa las dependencias necesarias
import express from "express";
import exphbs from "express-handlebars";
import http from "http";
import { Server } from "socket.io";
import path from "path";

// Configura Express y WebSocket
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configura Handlebars y la carpeta de vistas
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Configura archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Manejo de la conexión WebSocket
io.on("connection", (socket) => {
    console.log("A user connected");

    // Maneja el evento 'addProduct'
    socket.on('addProduct', (productName) => {
        // Aquí implementa la lógica para agregar un producto y emitir un evento 'productAdded'
        console.log("Nuevo producto:", productName);
        io.emit('productAdded', productName);
    });
});

// Ruta para la vista home
app.get("/", (req, res) => {
    res.render("home", { products: ["Producto 1", "Producto 2", "Producto 3"] });
});

// Ruta para la vista de productos en tiempo real
app.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", { products: ["Producto 1", "Producto 2", "Producto 3"] });
});

// Inicia el servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
