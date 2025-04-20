const  { WineModel }= require('../models/Wine')
const upload =require('../storage.js')// configuración multer+cloudinary


const wineController ={

    async createWine (req, res) {
        try {
             const { name, image,price,description, category, tastingNotes} = req.body;
       
             if (!req.file) return res.status(400).json({ error: 'Image is required.' });
            
             if (!name) return res.status(400).json({ error: "Name is required." });
             if (!description) return res.status(400).json({ error: "Description is required." });
             if (!price) return res.status(400).json({ error: "Price is required." });
             if (!category) return res.status(400).json({error:"Category is required"});
             if (!tastingNotes ||  !tastingNotes.vista ||   !tastingNotes.nariz ||  !tastingNotes.boca) {
               return res.status(400).json({ error: "Tasting notes (vista, nariz, boca) are required." });
             }

             
             const newWine= { name, 
              image: req.file.path, // URL que devuelve Cloudinary,
              price, description,  category, 
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
  },

  async getWineById (req, res) {
    try {
        const wineId = await WineModel.findById(req.params._id)
        res.status(200).json({ mensaje: 'Found wine', wineId })
    } catch (error) {
        console.error('Error Found wine', error);
    }
},
async updateWine(req, res) {
  try {
    const { id } = req.params; // ID del vino desde la URL
    const { name, price, description, category, tastingNotes } = req.body;

    const wine = await WineModel.findById(id);
    if (!wine) {
      return res.status(404).json({ error: "Wine not found." });
    }

    // Si se subió una nueva imagen, reemplazamos la anterior
    if (req.file) {
      wine.image = req.file.path;
    }

    if (name) wine.name = name;
    if (description) wine.description = description;
    if (category) wine.category = category;
    if (price) wine.price = price;

    if (tastingNotes) {
      if (tastingNotes.vista) wine.tastingNotes.vista = tastingNotes.vista;
      if (tastingNotes.nariz) wine.tastingNotes.nariz = tastingNotes.nariz;
      if (tastingNotes.boca) wine.tastingNotes.boca = tastingNotes.boca;
    }

    await wine.save();

    res.status(200).json({ message: "Wine updated successfully.", wine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There was a problem trying to update the wine." });
  }
},

  async deleteWine (req, res) {
    try {
      const wineId = await WineModel.findByIdAndDelete(req.params._id)
      res.status(200).json({ mensaje: 'wine removed' })
  } catch (error) {
      console.error('Error deleting wine', error);
  }
  }
}

 
module.exports= { wineController };