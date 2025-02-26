import mongoose from "mongoose";


mongoose.connect("mongodb+srv://fdleoo:coderhouse@cluster0.ikvo5.mongodb.net/TPFinal?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexión con Atlas, yupiiiii"))
    .catch((error) => console.log("Loco esto ta como raro, tenemos un error:", error))

    //"mongodb+srv://swtocaimaza:coderhouse@cluster0.pmzgicx.mongodb.net/TPFinal?retryWrites=true&w=majority&appName=Cluster0" pf
    //"mongodb+srv://fdleoo:coderhouse@cluster0.ikvo5.mongodb.net/TPFinal?retryWrites=true&w=majority&appName=Cluster0" mio