const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount"); // Importa el archivo con las credenciales

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}
const db = admin.firestore(); //Exportamos Firestore

const auth = admin.auth(); // Extrae `auth`

module.exports = { admin, auth, db };



