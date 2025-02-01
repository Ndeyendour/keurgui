import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
import axios from 'axios';
import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath } from '@fortawesome/free-solid-svg-icons';
import ClusterPopupContent from './ClusterPopupContent';
// Icône personnalisée pour les clusters et marqueurs individuels
const createCustomIcon = (text) => {
  return new L.DivIcon({
    html: `
      <div style="
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 41px;
        background: url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png') no-repeat center center;
        background-size: contain;
        color: white;
        font-size: 14px;
        font-weight: bold;
        text-shadow: 1px 1px 2px black;
      ">
        ${text}
      </div>
    `,
    className: 'custom-marker-icon',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

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
        width: 40px;
        height: 40px;
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
    iconSize: [40, 40],
  });
};

// Composant pour fermer les popups sur un clic dans la carte
const ClosePopupsOnClick = () => {
  const map = useMapEvent('click', () => {
    map.closePopup();
  });
  return null;
};

const CartePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://keurgui.onrender.com/api/products');
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

  const onClusterMouseOver = (cluster) => {
    const markers = cluster.layer.getAllChildMarkers();
    const clusterProperties = markers.map((marker) => {
      const product = products.find(
        (p) =>
          Math.abs(p.coordinates.latitude - marker.getLatLng().lat) < 0.0001 &&
          Math.abs(p.coordinates.longitude - marker.getLatLng().lng) < 0.0001
      );
      return product;
    });
  
    if (clusterProperties.length > 0) {
      const popupContainer = document.createElement('div');
  
      ReactDOM.render(<ClusterPopupContent properties={clusterProperties} />, popupContainer);
  
      const popup = L.popup()
        .setLatLng(cluster.layer.getLatLng())
        .setContent(popupContainer);
  
      cluster.layer._map.openPopup(popup);
    }
  };
  

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
        eventHandlers={{
          clustermouseover: onClusterMouseOver, // Afficher un popup au survol d'un cluster
        }}
      >
        {products.map((product, index) => (
          <Marker
            key={index}
            position={[
              product.coordinates.latitude,
              product.coordinates.longitude,
            ]}
            icon={createCustomIcon('1')} // Ajout du chiffre 1 sur les marqueurs individuels
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup(); // Ouvrir le popup au survol
              },
            }}
          >
            <Popup>
  <div
    style={{
      maxWidth: '200px', // Largeur maximale du popup
      padding: '10px', // Marges internes
      fontSize: '12px', // Taille de la police
      lineHeight: '1.4', // Hauteur de ligne
    }}
  >
    {/* Image principale */}
    <img
      src={product.images?.[0] || '/path/to/default-image.jpg'}
      alt={product.title}
      style={{
        width: '100%', // L'image occupe toute la largeur
        height: '80px', // Hauteur fixe
        objectFit: 'cover', // Ajuste l'image sans déformation
        borderRadius: '5px', // Coins arrondis
        marginBottom: '5px', // Espacement en bas
      }}
    />

    {/* Détails de la propriété */}
    <div>
      <h6
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '3px',
        }}
      >
        {product.price?.toLocaleString()} $
      </h6>
      <h6
        style={{
          fontSize: '13px',
          fontWeight: 600,
          marginBottom: '5px',
        }}
      >
        {product.title}
      </h6>
      <p
        style={{
          fontSize: '11px',
          color: '#666',
          marginBottom: '8px',
        }}
      >
        {product.address}, {product.city}
      </p>
      <div
        style={{
          display: 'flex',
          gap: '10px', // Espacement entre les icônes
        }}
      >
        <span
          style={{
            fontSize: '12px',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FontAwesomeIcon icon={faBed} style={{ marginRight: '3px' }} />
          {product.features?.bedrooms || 0}
        </span>
        <span
          style={{
            fontSize: '12px',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FontAwesomeIcon icon={faBath} style={{ marginRight: '3px' }} />
          {product.features?.bathrooms || 0}
        </span>
      </div>
    </div>
  </div>
</Popup>

          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default CartePage;
