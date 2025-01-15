import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PropertyImagesPage.css'; // Assurez-vous d'avoir un fichier CSS pour le style

const PropertyImagesPage = () => {
  const { id } = useParams(); // Récupère l'ID de la propriété depuis l'URL
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Image sélectionnée
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}/images`);
        setImages(response.data);
        setSelectedImage(response.data[0]); // La première image est affichée par défaut
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des images.');
        setLoading(false);
      }
    };

    fetchImages();
  }, [id]);

  if (loading) return <p>Chargement des images...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="property-images-page">
      <div className="header">
        <h1></h1>
        <span className="close-icon" onClick={() => navigate(-1)}>
  ✖
</span>

      </div>
      <div className="main-image-container">
        <img src={selectedImage} alt="Selected Property" className="main-image" />
      </div>
      <div className="thumbnail-gallery">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Property Thumbnail ${index + 1}`}
            className={`thumbnail-image ${img === selectedImage ? 'selected' : ''}`}
            onClick={() => setSelectedImage(img)} // Mettre à jour l'image sélectionnée
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyImagesPage;
