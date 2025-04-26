const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

 
router.post('/register',authController.verifyUser)


router.post('/login', authController.verifyToken);

router.get('/logout',authController.logout)

router.get('/checkSession',authController.getCurrentUser)



// Ruta protegida (requiere cookie con token válido)
router.get('/dashboard', authMiddleware, authController.getDashboard);


module.exports =router;