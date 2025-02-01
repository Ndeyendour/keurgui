import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./edit.css";

const EditProperty = () => {
  const { id } = useParams(); // Récupérer l'ID du produit depuis l'URL
  const navigate = useNavigate(); // Navigation après soumission
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    transactionType: "sale",
    productType: "",
    propertyCategory: "residential",
    address: "",
    city: "",
    features: {
      bedrooms: 0,
      bathrooms: 0,
      parkingSpaces: 0,
      garages: 0,
      hasPool: false,
      isWheelchairAccessible: false,
      isWaterfront: false,
      hasNavigableWater: false,
      allowsPets: false,
      allowsSmoking: false,
    },
    images: [], // Initialiser les images comme tableau vide
    buildingDetails: {
      yearBuilt: "",
      isNewConstruction: false,
      isHistorical: false,
      structureType: "Plain-pied",
    },
    description: "",
    agentName: "",
    moveInDate: "",
    isForeclosure: false,
  });

  // Charger les données existantes du produit
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://keurgui.onrender.com/api/products/${id}`);
        setFormData(response.data); // Charger les données dans le formulaire
      } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
      }
    };
    fetchProperty();
  }, [id]);

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Gestion des changements pour les sous-objets (features, buildingDetails)
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

  // Gestion des images (ajout/modification)
  const handleImageChange = (e, index) => {
    const newImages = [...formData.images];
    newImages[index] = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  // Ajouter une nouvelle image
  const handleAddImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ""],
    }));
  };

  // Supprimer une image
  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://keurgui.onrender.com/api/products/${id}`, formData);
      alert("Produit modifié avec succès");
      navigate("/adminpa"); // Rediriger vers la liste des produits
    } catch (error) {
      console.error("Erreur lors de la modification :", error.response || error);
      alert("Échec de la modification du produit");
    }
  };

  return (
    <div className="edit-property-container">
      <h2>Modifier le produit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre :</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Prix :</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Type de transaction :</label>
          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            required
          >
            <option value="sale">À vendre</option>
            <option value="rent">À louer</option>
            <option value="buy">À acheter</option>
          </select>
        </div>
        <div>
          <label>Type de produit :</label>
          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            required
          >
            <option value="Maison unifamiliale">Maison unifamiliale</option>
            <option value="Condo">Condo</option>
            <option value="Plex">Plex</option>
            <option value="Loft / Studio">Loft / Studio</option>
          </select>
        </div>
        <div>
          <label>Catégorie de propriété :</label>
          <select
            name="propertyCategory"
            value={formData.propertyCategory}
            onChange={handleChange}
            required
          >
            <option value="residential">Résidentiel</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label>Adresse :</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ville :</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
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
          <label>Chambres :</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.features.bedrooms}
            onChange={(e) => handleNestedChange(e, "features")}
          />
        </div>
        <div>
          <label>Salles de bain :</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.features.bathrooms}
            onChange={(e) => handleNestedChange(e, "features")}
          />
        </div>
        <div>
          <label>Description :</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default EditProperty;
