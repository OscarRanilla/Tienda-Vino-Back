const { auth, db } = require("../config/firebaseAdmin");

async function getUserFromToken(token) {
    if (!token) {
        throw new Error("Token no proporcionado");
  }

  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;

  const userDoc = await db.collection("users").doc(uid).get();

  if (!userDoc.exists) {
     throw new Error("Usuario no encontrado");
  }

  return userDoc.data();
}

module.exports = { getUserFromToken };
