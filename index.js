const {
  agregarPost,
  obtenerPost,
  actualizarPost,
  eliminarPost,
} = require("./consultas");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, console.log("¡Servidor encendido!"));

app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPost();
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error al obtener los posts");
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion, likes } = req.body;
    await agregarPost(titulo, img, descripcion, likes);
    res.send("Post agregado con éxito");
  } catch (error) {
    res.status(500).send("Error al agregar un post");
  }
});

app.put("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, img, descripcion, likes } = req.body;
    await actualizarPost(titulo, img, descripcion, likes, id);
    res.send("Post modificado con éxito");
  } catch (error) {
    res.status(500).send("Error al actualizar los posts");
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarPost(id);
    res.send("Post eliminado con éxito");
  } catch (error) {
    res.status(500).send("Error al eliminar el post");
  }
});
