const ErrorResponse = require("../helper/errorResponse");
const Libro = require("../models/Libro");
const LibroSchema = require("../models/Libro");

exports.getLibros = async (req, res, next) => {
  try {
    const libroLista = await LibroSchema.find();

    res.status(200).json({
      libroLista,
    });
  } catch (err) {
    next(new ErrorResponse("Error al obtener los libros" + err.message, 400));
  }
};

exports.getLibroById = async (req, res, next) => {
  try {
    const libro = await LibroSchema.findById(req.params.id);

    if (!libro) {
      return next(
        new ErrorResponse(
          "Error, no se pudo encontrar el libro" + err.message,
          400
        )
      );
    }

    res.status(200).json({
      libro,
    });
  } catch (err) {
    next(
      new ErrorResponse(
        "Error al obtener el libro por ese id" + err.message,
        400
      )
    );
  }
};

exports.crearLibro = async (req, res, next) => {
  try {
    const libro = await LibroSchema.create(req.body);

    res.status(200).json({
      status: 200,
      data: libro,
    });
  } catch (err) {
    next(new ErrorResponse("Error al crear el libro" + err.message, 400));
  }
};

exports.updateLibro = async (req, res, next) => {
  try {
    const libro = await LibroSchema.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: 200,
      data: libro,
    });
  } catch (err) {
    next(new ErrorResponse("Error al actualizar el libro" + err.message, 400));
  }
};

exports.eliminarLibro = async (req, res, next) => {
  try {
    const libro = await LibroSchema.findByIdAndDelete(req.params.id);

    if (!libro) {
      return next(new ErrorResponse("Error, el libro no existe", 400));
    }

    res.status(200).json({
      status: 200,
      data: libro,
    });
  } catch (err) {
    next(new ErrorResponse("Error al eliminar el libro" + err.message, 400));
  }
};

exports.pagination = async (req, res, next) => {
  try {
    const sort = req.body.sort;
    const sortDirection = req.body.sortDirection;
    const page = parseInt(req.body.page);
    const pageSize = parseInt(req.body.pageSize);

    let filterValor = "";
    let filterPropiedad = "";
    let libros = [];
    let totalRows = 0;

    if (req.body.filterValue) {
      // = {valor:"", propiedad:""}
      filterValor = req.body.filterValue.valor;
      filterPropiedad = req.body.filterValue.propiedad;

      libros = await Libro.find({
        [filterPropiedad]: new RegExp(filterValor, "i"),
      })
        .sort({ [sort]: sortDirection })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      totalRows = await LibroSchema.find({
        [filterPropiedad]: new RegExp(filterValor, "i"),
      }).count();
    } else {
      libros = await LibroSchema.find()
        .sort({ [sort]: sortDirection })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      totalRows = await Libro.find().count();
    }

    const pagesQuantity = Math.ceil(totalRows / pageSize); //redondea al mayor

    res.status(200).json({
      status: 200,
      pageSize,
      page,
      sort,
      sortDirection,
      pagesQuantity,
      totalRows,
      data: libros,
    });
  } catch (err) {
    next(new ErrorResponse("Error al procesar el request" + err.message, 400));
  }
};

/*JSON
{
    "pageSize": 10,
    "page":1,
    "sort": "titulo",
    "sortDirection": "asc",
    "filterValue": {"valor": "Programación0", "propiedad":"titulo"}
} */
