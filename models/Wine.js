const mongoose = require("mongoose");

const tastingNotesSchema = new mongoose.Schema({
  vista: { type: String, required: true },
  nariz: { type: String, required: true },
  boca: { type: String, required: true },
}, { _id: false });  

const wineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, 
    required: true,
    validate: {
        validator: function (value) {
          // Expresión regular para validar URLs (http, https, con o sin www)
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/.test(value);
        },
        message: 'The image must be a valid URL ending in .png, .jpg, .jpeg, .gif, .webp, or .svg.'
      }
     },
  price: { type: Number, required: true ,
    min: [0, 'The price cannot be negative.'],
    validate: {
      validator: function (value) {
        return typeof value === 'number' && !isNaN(value);
      },
      message: 'The price must be a valid number.'
    }
  },
  description: { type: String, required: true },
  tastingNotes: {
    type: tastingNotesSchema,
    required: true,
  },
}, { timestamps: true });

const WineModel = mongoose.model("Wine", wineSchema);

module.exports= { WineModel };