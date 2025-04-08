const express =require ('express');
const router =express.Router();
const {wineController }= require ('../controllers/wineController')


router.post('/create',  wineController.createWine) //Crea un nuevo vino.

module.exports = router;