const  { WineModel }= require('../models/Wine')
const upload =require('../storage.js')// configuración multer+cloudinary


const wineController ={

    async createWine (req, res) {
        try {
             const { name, image,description, price,  tastingNotes} = req.body;
       
             if (!req.file) return res.status(400).json({ error: 'Image is required.' });
            
             if (!name) return res.status(400).json({ error: "Name is required." });
             if (!description) return res.status(400).json({ error: "Description is required." });
             if (!price) return res.status(400).json({ error: "Price is required." });
             
             if (!tastingNotes ||  !tastingNotes.vista ||   !tastingNotes.nariz ||  !tastingNotes.boca) {
               return res.status(400).json({ error: "Tasting notes (vista, nariz, boca) are required." });
             }

             
             const newWine= { name, 
              image: req.file.path, // URL que devuelve Cloudinary,
              description, price,   
             tastingNotes: {
              vista: tastingNotes.vista,
              nariz: tastingNotes.nariz,
              boca: tastingNotes.boca
            } };
          
             const wine = await WineModel.create(newWine);
             res.status(201).send({ message: "Wine created successfully.", wine });
               // Guardar mensaje en la sesión
            // req.session.message = '¡Producto guardado exitosamente!';
        
 
            // ir a la página con todos los productos
           //  res.redirect('/dashboard');
         } catch (error) {
             console.error(error);
             res
                 .status(500)
                 .send({ message: "There was a problem trying to create a wine" });
         }
     
     },
     async getAllWines (req, res) {
      try {
          const wines = await WineModel.find()
          res.status(200).json({ mensaje: 'All wines', wines })
      } catch (error) {
          console.error('Error al traer los vinos', error);
      }
  }
}

 
module.exports= { wineController };