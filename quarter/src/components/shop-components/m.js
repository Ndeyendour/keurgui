import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "rc-slider";
import "./shop-grid.css";
import "./PropertyList.css";

const ShopGridV2 = () => {
  const [sortMethod, setSortMethod] = useState("recent");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 10000]);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Charger les produits à louer par défaut au montage
    fetchProducts("recent");
  }, []);

  useEffect(() => {
    // Recharger les produits lorsque le tri change
    fetchProducts(sortMethod);
  }, [sortMethod]);

  const fetchProductsBySort = async (sortMethod) => {
    setLoading(true);
    try {
      const response = await axios.get("https://keurgui.onrender.com/api/products", {
        params: {
          sort: sortMethod,
          transactionType: "rent", // Par défaut, uniquement les propriétés à louer
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
        },
      });
      setProducts(response.data.products || []);
      setTotalProperties(response.data.total || 0);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (e) => {
    setSortMethod(e.target.value); // Met à jour le tri
  };

  const handleApplyFilter = () => {
    setPriceRange(selectedPriceRange);
    fetchProducts(sortMethod); // Recharge les produits avec le filtre de prix
    setIsPriceFilterOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(sortMethod); // Recharge les produits pour la nouvelle page
  };

  return (
    <div>
      <div className="ltn__product-area ltn__product-gutter mb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Barre de recherche et filtres */}
              <div className="filters-container">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="search-input"
                />
                <button
                  className="filter"
                  onClick={() => setIsPriceFilterOpen(!isPriceFilterOpen)}
                >
                  Prix
                </button>
                {isPriceFilterOpen && (
                  <div className="price-filter-card">
                    <h4>Prix</h4>
                    <Slider
                      range
                      min={0}
                      max={10000}
                      step={100}
                      value={selectedPriceRange}
                      onChange={setSelectedPriceRange}
                    />
                    <div className="price-inputs">
                      <span>{selectedPriceRange[0]} FCFA</span> -
                      <span>{selectedPriceRange[1]} FCFA+</span>
                    </div>
                    <button className="apply-button" onClick={handleApplyFilter}>
                      Appliquer
                    </button>
                  </div>
                )}
                <select
                  className="sort-dropdown"
                  value={sortMethod}
                  onChange={handleSortChange}
                >
                  <option value="recent">Publication récente</option>
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                </select>
              </div>

              {/* Produits */}
              {loading ? (
                <p>Chargement des produits...</p>
              ) : (
                <div className="row">
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <div key={product._id} className="col-lg-3 col-sm-6 col-12">
                        <img
                          src={product.images[0] || "/path/to/default-image.jpg"}
                          alt={product.title}
                          className="property-image"
                        />
                        <div className="property-details">
                          <h6>{product.price?.toLocaleString()} FCFA</h6>
                          <h6>{product.title}</h6>
                          <p>
                            {product.address}, {product.city}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Aucun produit trouvé.</p>
                  )}
                </div>
              )}

              {/* Pagination */}
              <div className="pagination-container">
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  «
                </button>
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ‹
                </button>
                <span className="pagination-info">
                  {currentPage} / {Math.ceil(totalProperties / 20)}
                </span>
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(totalProperties / 20)}
                >
                  ›
                </button>
                <button
                  className="pagination-button"
                  onClick={() =>
                    handlePageChange(Math.ceil(totalProperties / 20))
                  }
                  disabled={currentPage === Math.ceil(totalProperties / 20)}
                >
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopGridV2;
