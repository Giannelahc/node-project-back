const Autor = require("../models/Autor");

exports.crearAutor = async (req, res, next) => {
  try {
    const autorData = await Autor.create(req.body); // te devuelve el id generado de mongo db

    res.status(200).json({
      status: 200,
      data: autorData,
    });
  } catch (err) {
    res.status(400).json({ status: 400, mensaje: err });
  }
};

exports.getAutor = async (req, res, next) => {
  try {
    const autorLista = await Autor.find(); // te devuelve el id generado de mongo db
    res.status(200).json(autorLista);
  } catch (err) {
    res.status(400).json({ status: 400, mensaje: err });
  }
};

exports.getAutorById = async (req, res, next) => {
  try {
    const autor = await Autor.findById(req.params.id); // te devuelve el id generado de mongo db
    res.status(200).json(autor);
  } catch (err) {
    res.status(400).json({ status: 400, mensaje: err });
  }
};

exports.updateAutor = async (req, res, next) => {
  try {
    const autor = await Autor.findByIdAndUpdate(req.params.id, req.body); // te devuelve el id generado de mongo db
    if (!autor) {
      return res.status(400).json({ status: 400 });
    }
    res.status(200).json({ status: 200, data: autor });
  } catch (err) {
    res.status(400).json({ status: 400, mensaje: err });
  }
};

exports.deleteAutor = async (req, res, next) => {
  try {
    const autor = await Autor.findByIdAndDelete(req.params.id); // te devuelve el id generado de mongo db
    if (!autor) {
      return res.status(400).json({ status: 400 });
    }
    res.status(200).json({ status: 200 });
  } catch (err) {
    res.status(400).json({ status: 400, mensaje: err });
  }
};
