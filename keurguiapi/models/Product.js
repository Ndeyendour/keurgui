const mongoose = require('mongoose');

// Définition du schéma pour les produits
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    transactionType: { type: String, enum: ['sale', 'rent', 'buy'], required: true },
    productType: { 
      type: String, 
      enum: ['Maison unifamiliale', 'Condo', 'Plex', 'Loft / Studio', 'Maison mobile', 'Intergénération', 'Fermette', 'Terrain', 'Chalet', 'Villa'], 
      required: true 
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    features: {
      bedrooms: { type: Number, default: 0 },
      bathrooms: { type: Number, default: 0 },
      parkingSpaces: { type: Number, default: 0 },
      garages: { type: Number, default: 0 },
      area: { type: Number },
      hasPool: { type: Boolean, default: false },
      isWheelchairAccessible: { type: Boolean, default: false },
      isWaterfront: { type: Boolean, default: false },
      hasNavigableWater: { type: Boolean, default: false },
      allowsPets: { type: Boolean, default: false },
      allowsSmoking: { type: Boolean, default: false },
    },
    images: { 
      type: [String],
      required: true 
    },
    buildingDetails: {
      yearBuilt: { type: Number },
      isNewConstruction: { type: Boolean, default: false },
      isHistorical: { type: Boolean, default: false },
      structureType: { type: String, enum: ['Plain-pied', 'À étages', 'Paliers multiples', 'Jumelé', 'Détaché', 'En rangée', 'Maison contemporaine'], default: 'Plain-pied' },
    },
    isVirtualTourAvailable: { type: Boolean, default: false },
    isOpenHouse: { type: Boolean, default: false },
    lotSize: { type: Number },
    description: { type: String },
    agentName: { type: String, required: true },
    moveInDate: { type: Date },
    isForeclosure: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Ajout d'un index pour les recherches fréquentes
productSchema.index({ city: 1, price: 1, transactionType: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
