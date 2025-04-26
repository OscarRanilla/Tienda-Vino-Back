const express =require ('express');
const router =express.Router();
const {wineController }= require ('../controllers/wineController')
const upload =require('../storage.js')// configuración multer+cloudinary


router.post('/create', upload.single('image'), wineController.createWine) //Crea un nuevo vino.

// - GET /: obtener todos los vinos.
router.get('/', wineController.getAllWines)


// - GET /id/:_id: busca un vino por id.
//router.get('/id/:_id', wineController.getWineById)
router.get('/:_id', wineController.getWineById)

//Elimina un vino
router.delete('/id/:_id', wineController.deleteWine)

//PUT modificar los datos del vino por ID
router.put('/update/:id', upload.single('image'), wineController.updateWine);

module.exports = router;