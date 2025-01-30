const { agregarPost, obtenerPost } = require('./consultas');
const express = require("express");
const cors = require('cors');

const app = express();


app.use(cors());

app.listen(3000, console.log("¡Servidor encendido!"));

app.use(express.json());

app.get("/posts", async (req, res) => {
    const posts = await obtenerPost()
    res.json(posts)
});

app.post("/posts", async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body
    await agregarPost( titulo, img, descripcion, likes )
    res.send("Post agregado con éxito")
});

