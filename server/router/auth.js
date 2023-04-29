const express = require("express");
const AuthController = require("../controllers/auth");

const api = express.Router();
// Registro usuarios
api.post("/auth/register",AuthController.register);

// Login usuarios
api.post("/auth/login",AuthController.login);

// Refresh
api.post("/auth/refresh_access_token",AuthController.refreshAccessToken);

module.exports = api;

