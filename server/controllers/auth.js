const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

// Registro de usuarios 
function register(req, res) {
    const {firstname,lastname,email,password} = req.body;
    
    if(!email) res.status(400).send({ msg: "El email es  obligatorio" });
    if(!password) res.status(400).send({ msg: "La contraseña es obligatorio" });
    
    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false,
    });
    
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    
    user.save((error, userStorage) => {    
      if(error){
        res.status(400).send({ msg: "Error al crear el usuario"});
      } else {
        res.status(200).send(userStorage);
      }
    });
    
    //console.log("se ha ejecutado el registro");
    //res.status(200).send({ msg: "Todo OK"});
}

// Login de usuarios
function login(req, res) {
  const { email, password } = req.body;

  if(!email) res.status(400).send({msg: "El correo es obligatorio"});
  if(!password) res.status(400).send({msg: "La contraseña es obigatoria"});

  const emailLowerCase = email.toLowerCase();

  User.findOne({ email: emailLowerCase }, (error, userStore) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else if (!userStore) {
      res.status(400).send({ msg: "El usuario no existe" });
    } else {
       bcrypt.compare(password, userStore.password, (bcryptError, check) => {
          if(bcryptError) {
            res.status(500).send({ msg: "Error del servidor" });
          } else if (!check) {
            res.status(400).send({ msg: "Error del servidor" });
          } else if(!userStore.active) {
            res.status(401).send({ msg: "Usuario no autorizado o no activo" });
          } else {
            res.status(200).send({
              access: jwt.createAccessToken(userStore),
              refresh: jwt.createRefreshToken(userStore),
            });
          }
        });
    }
  });
  
}

// Refresh
function refreshAccessToken(req, res){
  const { token } = req.body;
  
  if(!token){
    res.status(400).send({ msg:"Token requerido" });
  } else {
    const { user_id } = jwt.decode(token);

    User.findOne({ _id: user_id }, (error, userStorage) => {
      if (error) {
        res.status(500).send({ msg: "Error del servidor" });
      } else {
        res.status(200).send({
          accessToken: jwt.createAccessToken(userStorage),
        });
      }
    });
  }
}

module.exports = {
  register,
  login,
  refreshAccessToken,
};