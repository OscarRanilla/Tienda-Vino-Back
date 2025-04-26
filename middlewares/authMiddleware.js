const { getApps, initializeApp } = require('firebase-admin/app');
if (!getApps().length) initializeApp();
require('dotenv').config();
const logger = require('../utils/logger'); 



const { auth} = require("../config/firebaseAdmin"); 

const authVerification = (req, res, next) => {
    const tokenCookie = req.cookies[process.env.SECRET_WORD]; 

    if (!tokenCookie) {
        return res.status(401).json({ success: false, message: "There is no token" });
    }

    auth.verifyIdToken(tokenCookie)
        .then((decodedToken) => {
            req.user = decodedToken;
            next();
        })
        .catch((error) => {
            logger.error("Error verifying cookie token: %s", error.message);
            res.status(401).json({ success: false, message: "Invalid token" }); // Enviar respuesta de error
        });
};

module.exports = authVerification;
