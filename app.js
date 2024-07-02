const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const indexRouter = require("./src/routes/index.routes.js");
const methodOverride = require("method-override");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Configuración del motor de plantillas EJS
app.set("view engine", "ejs");
app.set("views", __dirname + "/src/views");

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Servidor arriba en el puerto http://localhost:${port}`);
});
