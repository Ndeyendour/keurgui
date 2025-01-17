import React, { Component,useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Social from '../section-components/social';
import './navbar.css'
import { useFavorites } from '../global-components/FavoritesContext';
import { useNavigate } from 'react-router-dom';
const NavbarV2 = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitial, setUserInitial] = useState("");
  const browsernavigate = useNavigate(); 
//   const [isMenuOpen, setMenuOpen] = useState(false);
  // Remplacez par vos données utilisateur
 
  const firstName = 'Ndeye';
  const lastName = 'Ndour';

  
//   const toggleMenu = () => {
// 	console.log("Cercle cliqué !"); // Ajout temporaire pour déboguer
// 	setMenuOpen(!isMenuOpen);
//   };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userFirstName = localStorage.getItem("firstname");

    if (token && userFirstName) {
      setIsLoggedIn(true);
      setUserInitial(userFirstName.charAt(0).toUpperCase());
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-menu-container")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const handleLogout = () => {
    // Supprime le token et les données utilisateur
    localStorage.removeItem("token");
    localStorage.removeItem("firstname");

    // Met à jour l'état local
    setIsLoggedIn(false);
    setUserInitial("");

    // Redirige vers la page d'accueil
    browsernavigate("/");
  };

        let publicUrl = process.env.PUBLIC_URL+'/'
		const CustomClass = props.CustomClass ? props.CustomClass : '';
		// let CustomClass = this.props.CustomClass ? this.props.CustomClass : ''
// ---------------favoris--------------------
		const { favorites } = useFavorites();


		return (
			<div>
				<header className={"ltn__header-area ltn__header-5 ltn__header-logo-and-mobile-menu-in-mobile ltn__header-logo-and-mobile-menu ltn__header-transparent--- gradient-color-4--- "+ CustomClass} >
				{/* ltn__header-top-area start */}
				
				{/* ltn__header-top-area end */}
				{/* ltn__header-middle-area start */}
				<div className="ltn__header-middle-area ltn__header-sticky ltn__sticky-bg-white">
					<div className="container">
					<div className="row">
						<div className="col">
						<div className="site-logo-wrap">
							<div className="site-logo go-top">
							<Link to="/"><img src={publicUrl+"assets/img/logo.png"} alt="Logo" /></Link>
							</div>
						
						</div>
						</div>
						<div className="col header-menu-column">
						<div className="header-menu d-none d-xl-block go-top">
							<nav>
							<div className="ltn__main-menu">
								<ul>
								{/* <li className="#"><Link to="/vendre">Rechercher</Link>
									
								</li> */}
								<li className=""><Link to="#">Acheter</Link>
									<ul>
										<li><Link to="/vendre">Trouver une propriete a vendre</Link></li>
										<li><Link to="/service">Guide de l'acheteur</Link></li>
										<li><Link to="/service-details">Acheter avec un courtier</Link></li>
										
									</ul>
								</li>
								<li className=""><Link to="#">Louer</Link>
									<ul>
									<li><Link to="/louer">Trouver une propriete a louer</Link></li>
										<li><Link to="/agent">Guide de du locataire</Link></li>
										<li><Link to="/service-details">Enquete de prelocation</Link></li>
									</ul>
								</li>
								<li className=""><Link to="/blog-grid">Vendre</Link>
									<ul>
									
										<li><Link to="/service">Guide du vendeur</Link></li>
										<li><Link to="/service-details">Vendre avec un courtier</Link></li>
									</ul>
								</li>
								<li className=""><a href="#">Qui sommes nous ?</a>
								<ul>
									
										<li><Link to="/agent">Trouver un courtier</Link></li>
										<li><Link to="/service-details">Acheteer avec un courtier</Link></li>
										<li><Link to="/service">Vendeur avec un courtier</Link></li>
										<li><Link to="/service-details">Devenir courtier</Link></li>
									</ul>
								
							</li>
								<li className="special-link" style={{ borderRadius: '8px' }}>
								<Link to="/login">
									Nous rejoindre
								</Link>
								</li>
									<li
  className={`special-link ${!isLoggedIn ? "not-logged-in" : ""}`}
  style={{
    backgroundColor: !isLoggedIn ? "#f8d7da" : "transparent", 
	borderRadius: "40px", // Rayon de la bordure
    padding: "0px", // Espacement interne// Couleur si non connecté
  }}
>
  {isLoggedIn ? (
    <div className="user-menu-container">
      <div className="user-circle" onClick={toggleMenu}>
        {userInitial}
      </div>
      {isMenuOpen && (
        <ul className="menu-list">
          <li>
            <Link to="/mes-recherches">🔔 Mes recherches (0)</Link>
          </li>
          <li>
            <Link to="/mes-favoris">💖 Mes favoris ({favorites.length})</Link>
          </li>
          <li>
            <Link to="/proprietes-cachees">👁️ Propriétés cachées (1)</Link>
          </li>
          <li>
            <Link to="/mon-courtier">👥 Mon courtier</Link>
          </li>
          <li>
            <Link to="/profil-locataire">🏠 Mon profil locataire</Link>
          </li>
          <li>
            <Link to="/parametres">⚙️ Mes paramètres</Link>
          </li>
          <li className="logout-link">
            <a href="#" onClick={handleLogout}>
              Déconnexion
            </a>
          </li>
          <li>
            <Link to="/acces-courtier">Accès courtier</Link>
          </li>
        </ul>
      )}
    </div>
  ) : (
    <Link to="/login">
      Connexion <i className="far fa-user" />
    </Link>
  )}
</li>


								

								</ul>
								
							</div>
							
							</nav>
						</div>
						</div>
						<div className="col--- ltn__header-options ltn__header-options-2 ">
						{/* Mobile Menu Button */}
						<div className="mobile-menu-toggle d-xl-none">
							<a href="#ltn__utilize-mobile-menu" className="ltn__utilize-toggle">
							<svg viewBox="0 0 800 600">
								<path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" id="top" />
								<path d="M300,320 L540,320" id="middle" />
								<path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" id="bottom" transform="translate(480, 320) scale(1, -1) translate(-480, -318) " />
							</svg>
							</a>
						</div>
						</div>
					</div>
					</div>
				</div>
				{/* ltn__header-middle-area end */}
				</header>
				<div id="ltn__utilize-mobile-menu" className="ltn__utilize ltn__utilize-mobile-menu">
				<div className="ltn__utilize-menu-inner ltn__scrollbar">
					<div className="ltn__utilize-menu-head">
					<div className="site-logo">
						<Link to="/"><img src={publicUrl+"assets/img/logo.png"} alt="Logo" /></Link>
					</div>
					<button className="ltn__utilize-close">×</button>
					</div>
					<div className="ltn__utilize-menu-search-form">
					<form action={"#"}>
						<input type="text" placeholder="Search..." />
						<button><i className="fas fa-search" /></button>
					</form>
					</div>
					<div className="ltn__utilize-menu">
					<ul>
						<li><a href="#">Home</a>
						<ul className="sub-menu">
						<li><Link to="/">Home Style 01</Link></li>
						<li><Link to="/home-v2">Home Style 02</Link></li>
						<li><Link to="/home-v3">Home Style 03</Link></li>
						<li><Link to="/home-v4">Home Style 04</Link></li>
						<li><Link to="/home-v5">Home Style 05 <span className="menu-item-badge">video</span></Link></li>
						<li><Link to="/home-v6">Home Style 06</Link></li>
						<li><Link to="/home-v7">Home Style 07</Link></li>
						<li><Link to="/home-v8">Home Style 08</Link></li>
						<li><Link to="/home-v9">Home Style 09</Link></li>
						<li><Link to="/home-v10">Home Style 10</Link></li>
						</ul>
						</li>
						<li><Link to="/about">About</Link>
						<ul className="sub-menu">
							<li><Link to="/about">About</Link></li>
							<li><Link to="/service">Services</Link></li>
							<li><Link to="/service-details">Service Details</Link></li>
							<li><Link to="/portfolio">Portfolio</Link></li>
							<li><Link to="/portfolio-v2">Portfolio - 02</Link></li>
							<li><Link to="/portfolio-details">Portfolio Details</Link></li>
							<li><Link to="/team">Team</Link></li>
							<li><Link to="/team-details">Team Details</Link></li>
							<li><Link to="/faq">FAQ</Link></li>
							<li><Link to="/location">Google Map Locations</Link></li>
						</ul>
						</li>
						<li><Link to="/louer">Shop</Link>
						<ul className="sub-menu">
							<li><Link to="/louer">Shop</Link></li>
							<li><Link to="/">Shop Grid</Link></li>
							<li><Link to="/louer-left-sidebar">Shop Left sidebar</Link></li>
							<li><Link to="/louer-right-sidebar">Shop Right sidebar</Link></li>
							<li><Link to="/product-details">Shop Details</Link></li>
							<li><Link to="/cart">Cart</Link></li>
							<li><Link to="/checkout">Checkout</Link></li>
							<li><Link to="/my-account">My Account</Link></li>
							<li><Link to="/login">Sign in</Link></li>
							<li><Link to="/register">Register</Link></li>
						</ul>
						</li>
						<li><Link to="/blog-grid">News</Link>
						<ul className="sub-menu">
							<li><Link to="/blog">News</Link></li>
							<li><Link to="/blog-grid">News Grid</Link></li>
							<li><Link to="/blog-left-sidebar">News Left sidebar</Link></li>
							<li><Link to="/blog-right-sidebar">News Right sidebar</Link></li>
							<li><Link to="/blog-details">News details</Link></li>
						</ul>
						</li>
						<li><Link to="#">Pages</Link>
							<ul className="sub-menu">
								<li><Link to="/about">About</Link></li>
								<li><Link to="/service">Services</Link></li>
								<li><Link to="/service-details">Service Details</Link></li>
								<li><Link to="/portfolio">Portfolio</Link></li>
								<li><Link to="/portfolio-2">Portfolio - 02</Link></li>
								<li><Link to="/portfolio-details">Portfolio Details</Link></li>
								<li><Link to="/team">Team</Link></li>
								<li><Link to="/team-details">Team Details</Link></li>
								<li><Link to="/faq">FAQ</Link></li>
								<li><Link to="/navigate">navigate</Link></li>
								<li><Link to="/add-listing">Add Listing</Link></li>
								<li><Link to="/locations">Google Map Locations</Link></li>
								<li><Link to="/404">404</Link></li>
								<li><Link to="/contact">Contact</Link></li>
								<li><Link to="/coming-soon">Coming Soon</Link></li>
							</ul>
                    	</li>
						<li><Link to="/contact">Contact</Link></li>
					</ul>
					</div>
					<div className="ltn__utilize-buttons ltn__utilize-buttons-2">
					<ul>
						<li>
						<Link to="/my-account" title="My Account">
							<span className="utilize-btn-icon">
							<i className="far fa-user" />
							</span>
							My Account
						</Link>
						</li>
						<li>
						<Link to="/wishlist" title="Wishlist">
							<span className="utilize-btn-icon">
							<i className="far fa-heart" />
							<sup>3</sup>
							</span>
							Wishlist
						</Link>
						</li>
						<li>
						<Link to="/cart" title="Shoping Cart">
							<span className="utilize-btn-icon">
							<i className="fas fa-shopping-cart" />
							<sup>5</sup>
							</span>
							Shoping Cart
						</Link>
						</li>
					</ul>
					</div>
					<div className="ltn__social-media-2">
					<ul>
						<li><a href="#" title="Facebook"><i className="fab fa-facebook-f" /></a></li>
						<li><a href="#" title="Twitter"><i className="fab fa-twitter" /></a></li>
						<li><a href="#" title="Linkedin"><i className="fab fa-linkedin" /></a></li>
						<li><a href="#" title="Instagram"><i className="fab fa-instagram" /></a></li>
					</ul>
					</div>
				</div>
				</div>
			</div>
		)
    }

	const styles = {
		specialLink: {
		  listStyle: 'none',
		  margin: 0,
		  padding: 0,
		},
		userContainer: {
		  position: 'relative',
		},
		userCircle: {
		  width: '40px',
		  height: '40px',
		  backgroundColor: '#007bff',
		  color: 'white',
		  borderRadius: '50%',
		  display: 'flex',
		  justifyContent: 'center',
		  alignItems: 'center',
		  fontSize: '18px',
		  cursor: 'pointer',
		  transition: 'background-color 0.3s ease',
		},
		userCircleHover: {
		  backgroundColor: '#0056b3',
		},
		userMenuCard: {
		  display: 'none',
		  position: 'absolute',
		  top: '100%',
		  left: 0,
		  backgroundColor: 'white',
		  border: '1px solid #ccc',
		  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
		  zIndex: 10,
		  width: '200px',
		  padding: '10px 0',
		},
		userMenuCardVisible: {
		  display: 'block', // Affiche le menu
		  position: 'absolute',
		  top: '100%',
		  left: 0,
		  backgroundColor: 'white',
		  border: '1px solid #ccc',
		  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
		  zIndex: 10,
		  width: '200px',
		  padding: '10px 0',
		},
		userInfo: {
		  padding: '10px',
		  fontWeight: 'bold',
		  borderBottom: '1px solid #ccc',
		  backgroundColor: '#f9f9f9',
		},
		menuList: {
		  margin: 0,
		  padding: 0,
		  listStyle: 'none',
		},
		menuListItem: {
		  borderBottom: '1px solid #ccc',
		},
		menuLink: {
		  display: 'block',
		  padding: '10px',
		  textDecoration: 'none',
		  color: '#333',
		  fontSize: '14px',
		},
		menuLinkHover: {
		  backgroundColor: '#f0f0f0',
		},
		logoutLink: {
		  color: 'red',
		  fontWeight: 'bold',
		},
		loginLink: {
		  textDecoration: 'none',
		  color: '#007bff',
		  display: 'flex',
		  alignItems: 'center',
		},
	  };
	  

export default NavbarV2