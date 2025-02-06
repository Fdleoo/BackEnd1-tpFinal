//*        Ini imports
import express from "express";
import { engine } from "express-handlebars"
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
app.get("/", (req, res)=>{
    res.render('index')
})





//?         Listen
app.listen(PUERTO, ()=>{
    console.log(`tamo activo, puerto ${PUERTO} ya tu sabe`)
})