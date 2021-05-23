const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const libro = require("./rutas/libro");
const autor = require("./rutas/autor");
const connectDatabase = require("./config/db");
const errorHandler = require("./middleware/error");

dotenv.config({ path: "./config/config.env" });

connectDatabase();

const app = express();
app.use(express.json());
app.uses(cors());

/*const loger = (req, res, next) => {
  console.log("pasando por middleware");
  next(); //para ccontinuar al controller
};*/

//app.use(loger);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //librería para logger
}

app.use("/api/libro", libro);
app.use("/api/libreriaAutor", autor);

app.use(errorHandler); //mensaje en json hacia el cliente si es que hay error en casteo

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log("Servidor ejecutandose", process.env.NODE_ENV)
);

process.on("unhandledRejection", (err, promise) => {
  console.log("errores", err.message);
  server.close(() => process.exit(1));
});
