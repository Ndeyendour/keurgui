import React, { useState } from "react";
import axios from "axios";
import "./add.css";

const AddProperty = () => {
  const initialState = {
    title: "",
    price: "",
    transactionType: "sale",
    productType: "Maison unifamiliale",
    propertyCategory: "residential",
    status: "available",
    address: "",
    city: "",
    features: {
      bedrooms: 0, // Nombre de chambres
      bathrooms: 0, // Nombre de salles de bain
      parkingSpaces: 0,
      garages: 0,
      area: 0,
      hasPool: false,
      isWheelchairAccessible: false,
      isWaterfront: false,
      hasNavigableWater: false,
      allowsPets: false,
      allowsSmoking: false,
    },
    images: [""], // Tableau pour les images
    buildingDetails: {
      yearBuilt: "",
      isNewConstruction: false,
      isHistorical: false,
      structureType: "Plain-pied",
    },
    isVirtualTourAvailable: false,
    isOpenHouse: false,
    lotSize: 0,
    description: "",
    agentName: "",
    moveInDate: "",
    isForeclosure: false,
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleImageChange = (e, index) => {
    const newImages = [...formData.images];
    newImages[index] = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  const handleAddImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ""],
    }));
  };

  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  const validateForm = () => {
    const requiredFields = ["title", "price", "transactionType", "productType", "propertyCategory", "address", "city", "agentName"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Le champ "${field}" est obligatoire.`);
        return false;
      }
    }

    if (formData.images.some((img) => img.trim() === "")) {
      alert("Veuillez ajouter au moins une URL d'image valide.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Payload envoyé :", formData);

    if (!validateForm()) return;

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Produit ajouté avec succès !");
      setFormData(initialState); // Réinitialiser le formulaire après succès
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error.response?.data || error.message);
      alert(`Échec de l'ajout du produit : ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="add-property-container">
      <h2>Ajouter une propriete</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre :</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Prix :</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Type de transaction :</label>
          <select name="transactionType" value={formData.transactionType} onChange={handleChange} required>
            <option value="sale">À vendre</option>
            <option value="rent">À louer</option>
            <option value="buy">À acheter</option>
          </select>
        </div>
        <div>
          <label>Type de produit :</label>
          <select name="productType" value={formData.productType} onChange={handleChange} required>
            <option value="Maison unifamiliale">Maison unifamiliale</option>
            <option value="Condo">Condo</option>
            <option value="Plex">Plex</option>
            <option value="Loft / Studio">Loft / Studio</option>
          </select>
        </div>
        <div>
          <label>Catégorie de propriété :</label>
          <select name="propertyCategory" value={formData.propertyCategory} onChange={handleChange} required>
            <option value="residential">Résidentiel</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label>Nombre de chambres :</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.features.bedrooms}
            onChange={(e) => handleNestedChange(e, "features")}
            required
          />
        </div>
        <div>
          <label>Nombre de salles de bain :</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.features.bathrooms}
            onChange={(e) => handleNestedChange(e, "features")}
            required
          />
        </div>
        <div>
          <label>Adresse :</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Ville :</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div>
          <label>Images :</label>
          {formData.images.map((image, index) => (
            <div key={index}>
              <input
                type="text"
                value={image}
                placeholder="URL de l'image"
                onChange={(e) => handleImageChange(e, index)}
              />
              <button type="button" onClick={() => handleRemoveImage(index)}>
                Supprimer
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddImage}>
            Ajouter une image
          </button>
        </div>
        <div>
          <label>Description :</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Nom de l'agent :</label>
          <input type="text" name="agentName" value={formData.agentName} onChange={handleChange} required />
        </div>
        <div>
          <label>Date d'emménagement :</label>
          <input type="date" name="moveInDate" value={formData.moveInDate} onChange={handleChange} />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddProperty;
