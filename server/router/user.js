const express = require("express");
const UserController = require("../controllers/user");
const md_auth = require("../middlewares/authenticated");
const multiparty = require("connect-multiparty");

const md_upload = multiparty({uploadDir: "./uploads/avatar" });
const api = express.Router();

// Cuenta usuario
api.get("/user/me", [md_auth.asureAuth], UserController.getMe);

// Todos los usuarios
api.get("/users", [md_auth.asureAuth], UserController.getUsers);

// Crear un usuario
api.post("/user", [md_auth.asureAuth, md_upload], UserController.createUser);

// Actualizar usuarios
api.patch("/user/:id",[md_auth.asureAuth, md_upload],UserController.updateUser);

// Eliminar usuarios
api.delete("/user/:id",[md_auth.asureAuth],UserController.deletUser);

module.exports = api;