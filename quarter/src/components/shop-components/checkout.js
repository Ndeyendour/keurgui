import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
import axios from 'axios';
import L from 'leaflet';

// Icône personnalisée pour les marqueurs individuels
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Icône personnalisée pour les clusters
const createClusterCustomIcon = (cluster) => {
  const count = cluster.getChildCount();

  // Couleur du texte en fonction du nombre d'éléments
  const textColor = count < 10 ? 'white' : 'yellow';

  return new L.DivIcon({
    html: `
      <div style="
        position: relative;
        width: 40px;
        height: 40px;
        background: url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png') no-repeat center center;
        background-size: contain;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${textColor};
        font-size: 14px;
        font-weight: bold;
        text-shadow: 1px 1px 2px black;
      ">
        ${count}
      </div>
    `,
    className: 'custom-cluster-icon',
    iconSize: [40, 40],
  });
};

const CartePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        const validProducts = response.data.filter(
          (product) =>
            product.coordinates &&
            typeof product.coordinates.latitude === 'number' &&
            typeof product.coordinates.longitude === 'number'
        );
        setProducts(validProducts);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <MapContainer
      center={[14.7167, -17.4677]} // Centre sur Dakar
      zoom={12}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon} // Icônes personnalisées pour les clusters
      >
        {products.map((product, index) => (
          <Marker
            key={index}
            position={[
              product.coordinates.latitude,
              product.coordinates.longitude,
            ]}
            icon={customIcon} // Icône pour les marqueurs individuels
          >
            <Popup>
              <div>
                <strong>{product.title}</strong>
                <br />
                Prix: {product.price?.toLocaleString()} FCFA
                <br />
                Commune: {product.commune}
                <br />
                Quartier: {product.quartier}
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default CartePage;
