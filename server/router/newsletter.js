const express = require("express");
const NewsletterController = require("../controllers/newsletter");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

// Rutas
// Agregar corrreo
api.post("/newsletter", NewsletterController.suscribeEmail);

// obtener emails
api.get("/newsletter", [md_auth.asureAuth], NewsletterController.getEmail);

// Eliminar email
api.delete("/newsletter/:id", [md_auth.asureAuth], NewsletterController.deleteEmail);


module.exports = api;