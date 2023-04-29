const express = require("express");
const PostController = require("../controllers/post");
const multiparty = require("connect-multiparty"); 
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({uploadDir: "./uploads/blog" });

const api = express.Router();

// Router
// Crear post
api.post("/post", [md_auth.asureAuth, md_upload], PostController.createPost);

// Obtener post
api.get("/post", PostController.getPost);

// Actualizar post
api.patch("/post/:id", [md_auth.asureAuth, md_upload], PostController.updatePost);

// Eliminar post
api.delete("/post/:id", [md_auth.asureAuth, md_upload], PostController.deletePost);

// Obtener path post
api.get("/post/:path", PostController.getPathPost);

module.exports = api;