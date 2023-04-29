const express = require("express");
const MenuController = require("../controllers/menu");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

// ENDPOINT
// Crear menu
api.post("/menu",[md_auth.asureAuth], MenuController.createMenu);

// Obtener menus
api.get("/menu", MenuController.getMenus);

// Actualizar menu
api.patch("/menu/:id",[md_auth.asureAuth], MenuController.updateMenu);

// eliminar menu
api.delete("/menu/:id",[md_auth.asureAuth], MenuController.deleteMenu);

module.exports = api;