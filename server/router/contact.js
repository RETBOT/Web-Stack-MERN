const express = require("express");
const Contact = require("../controllers/contact");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

// APIs
// Crear menssage
api.post("/message", Contact.sendMessage);

// Ver los menssage
api.get("/message", [md_auth.asureAuth], Contact.getMessages);

// Actualizar menssage
api.patch("/message/:id", [md_auth.asureAuth], Contact.updateMessage);

// Eliminar menssage
api.delete("/message/:id", [md_auth.asureAuth], Contact.deleteMessage);

module.exports = api;