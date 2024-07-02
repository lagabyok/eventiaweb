const express = require("express");
const path = require("path");
const router = express.Router();
const mainController = require("../controllers/mainControllers");
const verifyToken = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

// Ruta de autenticación
router.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname + `./../../public/login.html`));
});
router.post("/login", authController.login);

// Rutas para mostrar las vistas
router.get("/espacios", mainController.obtenerEspacios);
router.get(
  "/espacios/crear",

  mainController.mostrarFormularioEditar
);
router.post("/espacios", mainController.crearEspacio);
router.get("/espacios/editar/:id", mainController.mostrarFormularioEditar);
router.put("/espacios/:id", mainController.actualizarEspacio);
router.post("/espacios", mainController.crearEspacio);
router.delete("/espacios/:id", mainController.eliminarEspacio);

router.post("/api/crearContacto", mainController.crearContacto);
router.get("/api/obtenerTipoEvento", mainController.obtenerTipoEvento);

router.get("/contacto", (req, res) => {
  res.sendFile(path.resolve(__dirname + `./../../public/contacto.html`));
});

router.get("/nosotros", (req, res) => {
  res.sendFile(path.resolve(__dirname + `./../../public/nosotros.html`));
});

router.get("/eventos", (req, res) => {
  res.sendFile(path.resolve(__dirname + `./../../public/eventos.html`));
});

router.get("/espacios", (req, res) => {
  res.sendFile(path.resolve(__dirname + `./../../public/espacios.html`));
});
router.use((req, res, next) => {
  res
    .status(400)
    .sendFile(path.resolve(__dirname + `./../../public/error.html`));
});

module.exports = router;
