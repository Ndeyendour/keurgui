import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
import axios from 'axios';
import L from 'leaflet';

// Icône personnalisée pour les marqueurs individuels et les clusters
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

  return new L.DivIcon({
    html: `
      <div style="
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 41px;
        height: 41px;
        background: url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png') no-repeat center center;
        background-size: contain;
        font-size: 14px;
        font-weight: bold;
        color: white;
        text-shadow: 1px 1px 2px black;
      ">
        ${count}
      </div>
    `,
    className: 'custom-cluster-icon',
    iconSize: [41, 41],
  });
};

// Composant pour fermer tous les popups lorsqu'on clique sur la carte
const ClosePopupsOnClick = () => {
  const map = useMapEvent('click', () => {
    map.closePopup(); // Fermer tous les popups ouverts sur la carte
  });
  return null;
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
      <ClosePopupsOnClick />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon} // Utiliser l'icône personnalisée pour les clusters
      >
        {products.map((product, index) => (
          <Marker
            key={index}
            position={[
              product.coordinates.latitude,
              product.coordinates.longitude,
            ]}
            icon={customIcon}
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup(); // Ouvrir le popup lors du survol
              },
            }}
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
                <br />
                <strong>1 propriété disponible</strong>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default CartePage;
