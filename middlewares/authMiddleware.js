const { getApps, initializeApp } = require('firebase-admin/app');
if (!getApps().length) initializeApp();
require('dotenv').config();


const { auth} = require("../config/firebaseAdmin"); 

const authVerification = (req, res, next) => {
    const tokenCookie = req.cookies[process.env.SECRET_WORD]; 

    console.log('Token en midelware: ' + tokenCookie)

    if (!tokenCookie) {
       // return res.redirect('/login');  // Usar return para detener el flujo
        console.error("Error en authVerification: No ha token");
        return res.status(401).json({ success: false, message: "No hay token" });
    }

    auth.verifyIdToken(tokenCookie)
        .then((decodedToken) => {
            req.user = decodedToken;
            next();
        })
        .catch((error) => {
            console.error(`Error al verificar el token de las cookies: ${error}`);
            res.status(401).json({ success: false, message: "Token inválido" }); // Enviar respuesta de error
        });
};

module.exports = authVerification;
