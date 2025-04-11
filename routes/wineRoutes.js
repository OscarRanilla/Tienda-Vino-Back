const express =require ('express');
const router =express.Router();
const {wineController }= require ('../controllers/wineController')
const upload =require('../storage.js')// configuración multer+cloudinary


router.post('/create', upload.single('image'), wineController.createWine) //Crea un nuevo vino.

// - GET /: Endpoint para traer todas las tareas.
router.get('/', wineController.getAllWines)

module.exports = router;