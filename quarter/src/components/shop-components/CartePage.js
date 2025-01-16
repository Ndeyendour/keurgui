import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
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

  const onClusterMouseOver = (cluster) => {
    const markers = cluster.layer.getAllChildMarkers();
    if (markers.length > 0) {
      const randomMarker = markers[0]; // On peut choisir ici un marqueur spécifique ou le premier
      const product = products.find(
        (p) =>
          p.coordinates.latitude === randomMarker.getLatLng().lat &&
          p.coordinates.longitude === randomMarker.getLatLng().lng
      );

      if (product) {
        const clusterPopup = L.popup()
          .setLatLng(cluster.layer.getLatLng())
          .setContent(`
            <strong>${product.title}</strong>
            <br />
            Prix: ${product.price?.toLocaleString()} FCFA
            <br />
            Commune: ${product.commune}
            <br />
            Quartier: ${product.quartier}
          `);
        cluster.target._map.openPopup(clusterPopup);
      }
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
        iconCreateFunction={createClusterCustomIcon}
        onMouseOver={(e) => onClusterMouseOver(e)} // Gestionnaire pour clusters
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
                e.target.openPopup();
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
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default CartePage;
