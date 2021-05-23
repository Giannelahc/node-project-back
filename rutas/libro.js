const express = require("express");

const ruta = express.Router();
/*
ruta.get("/", (req, res) => {
  res.status(200).json({ status: 200, mensaje: "Se ejecutó correctamente" });
});

ruta.get("/:id", (req, res) => {
  res.status(200).json({ status: 200, mensaje: "Se devuelve libro por id" });
});

ruta.post("/", (req, res) => {
  res.status(200).json({ status: 200, mensaje: "Se ha creado libro " });
});

ruta.put("/:id", (req, res) => {
  res.status(200).json({ status: 200, mensaje: "Se atualizó libro " });
});

ruta.delete("/:id", (req, res) => {
  res.status(200).json({ status: 200, mensaje: "Se eliminó el libro " });
});*/

const {
  crearLibro,
  eliminarLibro,
  getLibros,
  getLibroById,
  pagination,
} = require("../controllers/libro");

ruta.route("/").get(getLibros).post(crearLibro);

ruta.route("/:id").get(getLibroById).put(eliminarLibro);

ruta.route("/pagination").post(pagination);

module.exports = ruta;
