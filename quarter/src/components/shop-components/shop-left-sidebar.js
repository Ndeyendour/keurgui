import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath } from "@fortawesome/free-solid-svg-icons";

const MapWithHoverDetails = ({ products }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Carte interactive */}
        <div className="col-12">
          <MapContainer
            center={[14.7167, -17.4677]} // Coordonnées centrées sur Dakar
            zoom={12} // Zoom ajusté pour la région de Dakar
            style={{ height: "80vh", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {products.map((product) =>
              product.coordinates ? (
                <Marker
                  key={product._id}
                  position={[
                    product.coordinates.latitude,
                    product.coordinates.longitude,
                  ]}
                  eventHandlers={{
                    mouseover: () => setHoveredProduct(product), // Afficher les détails sur survol
                    mouseout: () => setHoveredProduct(null), // Masquer les détails lorsque la souris quitte
                  }}
                />
              ) : null
            )}
          </MapContainer>
        </div>
      </div>

      {/* Détails du produit sur survol */}
      {hoveredProduct && (
        <div
          className="hover-card"
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "300px",
            padding: "15px",
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            zIndex: 1000,
          }}
        >
          <img
            src={hoveredProduct.images[0] || "/path/to/default-image.jpg"}
            alt={hoveredProduct.title}
            style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
          />
          <h6>{hoveredProduct.price?.toLocaleString()} $</h6>
          <h6>{hoveredProduct.title}</h6>
          <p>
            {hoveredProduct.address}, {hoveredProduct.city}
          </p>
          <div className="property-features">
            <span>
              <FontAwesomeIcon icon={faBed} /> {hoveredProduct.features?.bedrooms || 0}
            </span>
            <span style={{ marginLeft: "10px" }}>
              <FontAwesomeIcon icon={faBath} /> {hoveredProduct.features?.bathrooms || 0}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapWithHoverDetails;
