import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PropertyImages = () => {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      return; // Ne pas lancer la requête si l'ID est absent
    }

    const fetchImages = async () => {
      try {
        const response = await axios.get(`https://keurgui.onrender.com/api/products/${id}/images`);
        setImages(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des images :", err);
        setError("Impossible de charger les images.");
      }
    };

    fetchImages();
  }, [id]);

  if (!id) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Aucune image sélectionnée</h2>
        <p>Veuillez sélectionner un produit pour voir ses images.</p>
        <img src="/default-placeholder.jpg" alt="Aucune image" style={{ width: "50%", borderRadius: "10px" }} />
      </div>
    );
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Images de la propriété</h2>
      <div>
        {images.length > 0 ? (
          images.map((img, index) => <img key={index} src={img} alt={`Image ${index + 1}`} />)
        ) : (
          <p>Aucune image disponible.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyImages;
