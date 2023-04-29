const User  = require("../models/user");
const bcrypt = require("bcryptjs");
const image = require("../utils/image");

// Pagina de usuario
async function getMe(req,res) {
    const { user_id } = req.user;
    const response = await User.findById(user_id);

    if(!response){
        res.status(400).send({ msg: "No se ha encontrado usuario" });
    } else {
        res.status(200).send(response);
    }
}

// Ver todos los usuarios
async function getUsers(req, res) {
    const {active} = req.query;
    let response = null;

    if(active === undefined){
        response = await User.find();
    } else {
        response = await User.find({ active });
    }
    
    res.status(200).send(response);
}

// Crear usuario
async function createUser(req, res){
    const {password} = req.body;

    const user = new User({ ...req.body, active: false });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);   
    
    user.password = hashPassword;

    if (req.files.avatar) {
        const imagePath = image.getFilePath(req.files.avatar);
        user.avatar = imagePath;
    }

    user.save((error, userStored) => {
        if(error) res.status(400).send({ msg: "Erro al crear el usuario"});
        else res.status(200).send(userStored);
    })    
}

// Actualizar usuarios
async function updateUser(req, res){
    const {id} = req.params;
    const userData = req.body;

    // Password
    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt);   
        userData.password = hashPassword;
    } else {
        delete userData.password;
    }

    // Avatar
    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar);
        userData.avatar = imagePath;
    }

    User.findByIdAndUpdate({_id: id}, userData, (error) => {
        if (error) res.status(400).send({ msg: "Error al actualizar el usuario"});
        else res.status(200).send({ msg: "Actualización correcta" });

    });

}

// Eliminar  usuario
async function deletUser(req, res){
    const {id} = req.params;
    User.findByIdAndDelete(id, (error) => {
        if (error) {
            res.status(400).send({ msg: "Error al eliminar el usuario" });
        } else {
            res.status(200).send({ msg: "Usuario eliminado" });
        }
    })
}

module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deletUser,
}