const express = require("express");
const CourseControler = require("../controllers/course");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({uploadDir: "./uploads/course" });

const api = express.Router();

// APIs
// Crear curso
api.post("/course",[md_auth.asureAuth, md_upload], CourseControler.createCourse);

// Ver los cursos
api.get("/course", CourseControler.getCourse);

// Actualizar curso
api.patch("/course/:id", [md_auth.asureAuth, md_upload], CourseControler.updateCourse);

// Eliminar curso
api.delete("/course/:id", [md_auth.asureAuth, md_upload], CourseControler.deleteCourse);

module.exports = api;