import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class CategoryV3 extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'
        let imagealt = 'image'

    return <div className="ltn__banner-area pt-120 go-top" style={{ marginTop: "-70px" }}>
				<div className="container">
				
				<div className="row">
				<h6 className="section-title">Proprietes a vendre</h6>

				<div className="col-lg-3 col-md-6">
				<div
					className="ltn__banner-item ltn__banner-style-4 text-color-white bg-image"
					data-bs-bg={publicUrl + "assets/img/gallery/9.jpg"}
					style={{
					height: "200px", // Hauteur ajustée
					backgroundSize: "cover", // Image ajustée
					backgroundPosition: "center", // Image centrée
					borderRadius: "15px", // Coins arrondis à 15px
					position: "relative", // Nécessaire pour positionner les éléments à l'intérieur
					overflow: "hidden", // Pour éviter que le texte dépasse
					}}
				>
					{/* Contenu positionné en bas */}
					
				</div>
				<div className=""
				style={{
					marginTop: "-20px",
				}}

					
					>
					<h6>
						<Link to="/shop" style={{ color: "black" }}>Chalets</Link>
					</h6>
					<p style={{
					marginTop: "-20px",
				}}>Réalisez votre rêve d'évasion en nature.</p>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
				<div
					className="ltn__banner-item ltn__banner-style-4 text-color-white bg-image"
					data-bs-bg={publicUrl + "assets/img/gallery/7.jpg"}
					style={{
					height: "200px", // Hauteur ajustée
					backgroundSize: "cover", // Image ajustée
					backgroundPosition: "center", // Image centrée
					borderRadius: "15px", // Coins arrondis à 15px
					position: "relative", // Nécessaire pour positionner les éléments à l'intérieur
					overflow: "hidden", // Pour éviter que le texte dépasse
					}}
				>
					{/* Contenu positionné en bas */}
					
				</div>
				<div className=""
				style={{
					marginTop: "-20px",
				}}

					
					>
					<h6>
						<Link to="/shop" style={{ color: "black" }}>Maison</Link>
					</h6>
					<p style={{
					marginTop: "-20px",
				}}>Trouvez la propriété qui répond à vos besoins.</p>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
				<div
					className="ltn__banner-item ltn__banner-style-4 text-color-white bg-image"
					data-bs-bg={publicUrl + "assets/img/gallery/3.jpg"}
					style={{
					height: "200px", // Hauteur ajustée
					backgroundSize: "cover", // Image ajustée
					backgroundPosition: "center", // Image centrée
					borderRadius: "15px", // Coins arrondis à 15px
					position: "relative", // Nécessaire pour positionner les éléments à l'intérieur
					overflow: "hidden", // Pour éviter que le texte dépasse
					}}
				>
					{/* Contenu positionné en bas */}
					
				</div>
				<div className=""
				style={{
					marginTop: "-20px",
				}}

					
					>
					<h6>
						<Link to="/shop" style={{ color: "black" }}>Condos</Link>
					</h6>
					<p style={{
					marginTop: "-20px",
				}}>Découvrez des condos dans le<br/> secteur convoité.</p>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
				<div
					className="ltn__banner-item ltn__banner-style-4 text-color-white bg-image"
					data-bs-bg={publicUrl + "assets/img/gallery/2.jpg"}
					style={{
					height: "200px", // Hauteur ajustée
					backgroundSize: "cover", // Image ajustée
					backgroundPosition: "center", // Image centrée
					borderRadius: "15px", // Coins arrondis à 15px
					position: "relative", // Nécessaire pour positionner les éléments à l'intérieur
					overflow: "hidden", // Pour éviter que le texte dépasse
					}}
				>
					{/* Contenu positionné en bas */}
					
				</div>
				<div className=""
				style={{
					marginTop: "-20px",
				}}

					
					>
					<h6>
						<Link to="/shop" style={{ color: "black" }}>Plex</Link>
					</h6>
					<p style={{
					marginTop: "-20px",
				}}>Démarrez votre projet d'investissement.</p>
					</div>
				</div>
				{/*  */}




					
				</div>
				</div>
				<div
      style={{
        position: "absolute",
       
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "black",
        padding: "10px 20px",
        borderRadius: "20px",
      }}
    >
      <Link to="/shop" style={{ color: "white", textDecoration: "none" }}>
        Voir toutes les propriétés a vendre
      </Link>
    </div>
			</div>
			
			
        }
}

export default CategoryV3