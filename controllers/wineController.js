const  { WineModel }= require('../models/Wine')

const wineController ={

    async createWine (req, res) {
        try {
             const { name, image,description, price,  tastingNotes: { vista, nariz, boca }} = req.body;
       
            
             if (!name) return res.status(400).json({ error: "Name is required." });
             if (!image) return res.status(400).json({ error: "Image is required." });
             if (!description) return res.status(400).json({ error: "Description is required." });
             if (!price) return res.status(400).json({ error: "Price is required." });
             
             if (!tastingNotes || !vista || !nariz || !boca) {
               return res.status(400).json({ error: "Tasting notes (vista, nariz, boca) are required." });
             }

             
             const newWine= { name, image,description, price,  tastingNotes: { vista, nariz, boca } };
          
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
     
     }
}

 
module.exports= { wineController };