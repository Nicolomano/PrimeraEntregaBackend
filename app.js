import express from "express";
import productRouter from "./productRouter.js";
import cartRouter from "./cartRouter.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);



app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
});
