//*        Ini imports
import express from "express";
import { engine } from "express-handlebars"
import "./database.js"
import cartsRouter from './routes/carts.routes.js'
import productsRouter from "./routes/products.routes.js"
import viewsRouter from "./routes/views.routes.js"
const PUERTO = 8080;
const app = express();
//*        Middls y handle
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/view")
//*         Wsocket


//*         rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);




//?         Listen
app.listen(PUERTO, ()=>{
    console.log(`tamo activo, puerto ${PUERTO} ya tu sabe`)
})