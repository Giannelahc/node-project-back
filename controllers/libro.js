exports.getLibros = (req, res, next) => {
  res.status(200).json({ status: 200, mensaje: "Se ejecutó correctamente" });
};

exports.getLibro = (req, res, next) => {
  res.status(200).json({ status: 200, mensaje: "Devuelve libro por id" });
};

exports.crearLibro = (req, res, next) => {
  res
    .status(200)
    .json({ status: 200, mensaje: "Se ha creado libro correctamente" });
};

exports.eliminarLibro = (req, res, next) => {
  res
    .status(200)
    .json({ status: 200, mensaje: "Se ha creado libro correctamente" });
};
