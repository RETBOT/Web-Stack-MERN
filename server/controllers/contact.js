const Contact = require("../models/contact");

// Funciones 
// Escribir mensajes
function sendMessage(req, res) {
    const { name, email, subject, message } = req.body;

    if (!email) {
        res.status(400).send({ msg: "Email obligatorio" });
    }

    if (!message) {
        res.status(400).send({ msg: "Mensaje obligatorio" });
    }

    const Message = new Contact({
        nombre: name,
        correo: email.toLowerCase(),
        asunto: subject,
        mensaje: message,
        active: true,
    });

    Message.save((error) => {
        if (error) res.status(400).send({ msg: "Error al enviar el mensaje" });
        else res.status(200).send({ msg: "Mensaje enviado" });
    })
}

// Obtener mensajes
async function getMessages(req, res) {
    const { active } = req.query;
    let response = null;

    if (active === undefined) {
        response = await Contact.find();
    } else {
        response = await Contact.find({ active });
    }

    res.status(200).send(response);
}

// Actualizar message
async function updateMessage(req, res) {
    const { id } = req.params;
    const messageData = req.body;

    Contact.findByIdAndUpdate({ _id: id }, messageData, (error) => {
        if (error) res.status(400).send({ msg: "Error al actualizar el mensaje" });
        else res.status(200).send({ msg: "Actualización correcta" });
    });
}

// Eliminar  mensaje
async function deleteMessage(req, res) {
    const { id } = req.params;
    Contact.findByIdAndDelete(id, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error al eliminar el mensaje" });
        } else {
            res.status(200).send({ msg: "Mensaje eliminado" });
        }
    })
}

module.exports = {
    sendMessage,
    getMessages,
    updateMessage,
    deleteMessage,
};