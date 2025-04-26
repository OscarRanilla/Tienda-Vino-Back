require('dotenv').config();
const { auth, db } = require("../config/firebaseAdmin"); 
const { getUserFromToken } = require("../services/authService");
const logger = require('../utils/logger'); 

const  authController ={
    async verifyToken(req, res) {
        const { idToken } = req.body;

        if (!idToken) {
          return res.status(400).json({ success: false, message: "Token not received" });
        }
      
        try {
              
          //Lo guarda en la cookie el token
          res.cookie(process.env.SECRET_WORD, idToken, {
            httpOnly: true,
            secure: true,         // false en localhost (sin HTTPS)
            sameSite: 'Lax'        // en localhost funciona mejor así
           // sameSite: "None",
          });

          const userData = await getUserFromToken(idToken);
      
          return res.json({
            success: true,
            message: "Token verified and user found",
            user: userData,
          });
        } catch (error) {
          logger.error("Error in verifyToken: %s", error.message);  
          return res.status(401).json({ success: false, message: error.message });
        }
      },
      
      async getCurrentUser(req, res) {
        try {
          const tokenFromCookie = req.cookies[process.env.SECRET_WORD];
          const userData = await getUserFromToken(tokenFromCookie);
      
          return res.json({
            success: true,
            user: userData,
          });
        } catch (error) {
          logger.error("Error in getCurrentUser: %s", error.message); 
          return res.status(401).json({ success: false, message: error.message });
        }
      },

    async logout(req, res) {
        res.clearCookie(process.env.SECRET_WORD);
        return res.json({ success: true, message: "Session closed" });
    },



    async verifyUser(req, res) {
        const { email, password, username } = req.body;
        const sanitizedUsername = username?.trim();
        try {
            
            const userRecord = await auth.createUser({
                email,
                password,
                displayName: sanitizedUsername // Aquí usamos el username
            });

               // Guardar datos en Firestore
            try {
                await db.collection('users').doc(userRecord.uid).set({
                    email,
                    sanitizedUsername,
                    createdAt: new Date()
                });
              } catch (firestoreError) {
                logger.error("Error saving to Firestore: %s", firestoreError.message);
                return res.status(500).json({ success: false, message: "User created, but error saving data." });
              }
    

            res.json({ success: true, message: "User created and saved in Firestore" });
        } catch (error) {
            logger.error("Error interno de registro: %s", error.message);

            switch (error.code) {
                case 'auth/email-already-exists':
                  return res.status(400).json({ success: false, message: "That email is already registered." });
                case 'auth/invalid-password':
                  return res.status(400).json({ success: false, message: "Invalid password." });
                default:
                  return res.status(500).json({ success: false, message: "Error creating user." });
              }
        }
    },
    async getDashboard(req, res) {
      try {
        return res.json({
          success: true,
          message: "Bienvenido al dashboard",
          user: req.user
        });
      } catch (error) {
        logger.error("Error in getDashboard: %s", error.message);
        return res.status(500).json({ success: false, message: "Error loading dashboard" });
      }
    }
    
    

    


};




module.exports = authController;