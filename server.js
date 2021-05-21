const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");

const libro = require("./rutas/libro");

dotenv.config({ path: "./config/config.env" });

const app = express();

/*const loger = (req, res, next) => {
  console.log("pasando por middleware");
  next(); //para ccontinuar al controller
};*/

//app.use(loger);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //librería para logger
}

app.use("/api/libro", libro);

const PORT = process.env.PORT;

app.listen(PORT, console.log("Servidor ejecutandose", process.env.NODE_ENV));
