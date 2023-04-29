const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {
    if(!req.headers.authorization){
       return res.status(403).send({ msg: "La peticion no tiene la cabecera de autenticacón" });
    }

    const token = req.headers.authorization.replace("Bearer ", "").replace("Token ", "");
    try {
        const payload = jwt.decode(token);
        const { exp } = payload;
        const currentData = new Date().getTime();

        if(exp <= currentData){
            return res.status(400).send({ msg:"El token ha expirado" });
        }
        req.user = payload;
        next();
    } catch (error) {
        return res.status(400).send({ msg: "Token invalido"});
    }
}

module.exports = {
    asureAuth,
}