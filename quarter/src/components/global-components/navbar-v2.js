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
								<li className=""><Link to="/vendre">Acheter</Link>
									
								</li>
								<li className=""><Link to="/louer">Louer</Link>
									
								</li>
								<li className=""><Link to="/vendre">Vendre</Link>
									
								</li>
								<li className=""><Link to="/about">Qui sommes nous ?</Link></li>
								<li className=""><Link to="">Nous rejoindre</Link></li>
								{/* <li className="special-link" style={{ borderRadius: '8px' }}>
								<Link to="/contact">
									Nous rejoindre
								</Link>
								</li> */}
									<li
  className={`special-link ${!isLoggedIn ? "not-logged-in" : ""}`}
  // Supprimé : Pas de backgroundColor ici
  style={{
    borderRadius: "40px",
    padding: "0px",
   
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
            <Link to="">👁️ Propriétés cachées (1)</Link>
          </li>
          <li>
            <Link to="">👥 Mon courtier</Link>
          </li>
          <li>
            <Link to="">🏠 Mon profil locataire</Link>
          </li>
          <li>
            <Link to="">⚙️ Mes paramètres</Link>
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
					{/* <div className="ltn__utilize-menu-search-form">
					<form action={"#"}>
						<input type="text" placeholder="Search..." />
						<button><i className="fas fa-search" /></button>
					</form>
					</div> */}
					<div className="ltn__utilize-menu">
					<ul>
						<li><a href="/vendre">Acheter</a>
						
						</li>
						<li><Link to="/louer">Louer</Link>
						
						</li>
						<li><Link to="/vendre">Vendre</Link>
						
						</li>
						<li><Link to="/about">Qui sommes nous?</Link>
						
						</li>
						<li><Link to="/contact">Nous rejoindre</Link>
							
                    	</li>
						
					</ul>
					</div>
					<div className="ltn__utilize-buttons ltn__utilize-buttons-2">
					
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