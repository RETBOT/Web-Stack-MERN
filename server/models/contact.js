const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
    nombre: String,
    correo: String,
    asunto: String,
    mensaje: String,
    active: Boolean,
});

module.exports = mongoose.model("Contact", ContactSchema);