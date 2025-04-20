require('dotenv').config();
const { auth, db } = require("../config/firebaseAdmin"); //  Importamos db también
const { getUserFromToken } = require("../services/authService");


const  authController ={
    async verifyToken(req, res) {
        const { idToken } = req.body;
    
        if (!idToken) {
          return res.status(400).json({ success: false, message: "Token no recibido" });
        }
      
        try {
              
          //Lo guarda en la cookie el token
          res.cookie(process.env.SECRET_WORD, idToken, {
            httpOnly: true,
            secure: false,         // false en localhost (sin HTTPS)
            sameSite: 'Lax'        // en localhost funciona mejor así
           // sameSite: "None",
          });

          const userData = await getUserFromToken(idToken);
      
          return res.json({
            success: true,
            message: "Token verificado y usuario encontrado",
            user: userData,
          });
        } catch (error) {
          console.error("Error en verifyToken:", error.message);
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
          console.error("Error en getCurrentUser:", error.message);
          return res.status(401).json({ success: false, message: error.message });
        }
      },

    async logout(req, res) {
        res.clearCookie(process.env.SECRET_WORD);
        return res.json({ success: true, message: "Sesión cerrada" });
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
                console.error("Error al guardar en Firestore:", firestoreError.message);
                return res.status(500).json({ success: false, message: "Usuario creado, pero error al guardar datos." });
              }
    

            res.json({ success: true, message: "Usuario creado y guardado en Firestore" });
        } catch (error) {
            console.error(`Error interno de registro: ${error}`);

            switch (error.code) {
                case 'auth/email-already-exists':
                  return res.status(400).json({ success: false, message: "Ese correo ya está registrado." });
                case 'auth/invalid-password':
                  return res.status(400).json({ success: false, message: "Contraseña no válida." });
                default:
                  return res.status(500).json({ success: false, message: "Error al crear el usuario." });
              }
        }
    }
    

    


};




module.exports = authController;