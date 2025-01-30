const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "4324",
  database: "likeme",
  allowExitOnIdle: true,
});

const getDate = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log(result);
  } catch (error) {
    console.error("error al obtener fecha:", error);
  }
};

const agregarPost = async (titulo, img, descripcion, likes) => {
  try {
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
    const values = [titulo, img, descripcion, likes];
    const result = await pool.query(consulta, values);
    console.log("Post agregado");
  } catch (error) {
    console.error("Error al agregar el post:", error);
  }
};

const obtenerPost = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    console.log("Posts obtenidos");
    return rows;
  } catch (error) {
    console.error("Error al obtener el post:", error);
  }
};

const actualizarPost = async (titulo, img, descripcion, likes, id) => {
  try {
    const consulta =
      "UPDATE posts SET titulo = $1, img = $2, descripcion = $3, likes = $4 WHERE id = $5";
    const values = [titulo, img, descripcion, likes, id];
    const result = await pool.query(consulta, values);
    console.log("Post actualizado");
  } catch (error) {
    console.error("Error al actualizar el post:", error);
  }
};

const eliminarPost = async (id) => {
  try {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    const result = await pool.query(consulta, values);
    console.log("Post eliminado");
  } catch (error) {
    console.error("Error al eliminar el post:", error);
  }
};

module.exports = { agregarPost, obtenerPost, actualizarPost, eliminarPost };
