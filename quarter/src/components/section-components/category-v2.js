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
				<h6 className="section-title">Proprietes a louer ou vendre</h6>

				<div className="col-lg-3 col-md-6">
				<div
					className="ltn__banner-item ltn__banner-style-4 text-color-white bg-image"
					data-bs-bg={publicUrl + "assets/img/gallery/ec.jpg"}
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
						<Link to="" style={{ color: "black" }}>Local commercial</Link>
					</h6>
					<p style={{
					marginTop: "-20px",
				}}>Explorez une large gamme d'espaces commerciaux adaptés à vos besoins.</p>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
				<div
					className="ltn__banner-item ltn__banner-style-4 text-color-white bg-image"
					data-bs-bg={publicUrl + "assets/img/gallery/es.jpg"}
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
						<Link to="" style={{ color: "black" }}>Immeuble</Link>
					</h6>
					<p style={{
					marginTop: "-20px",
				}}>Concrétisez votre projet d’investissement en profitant d’un large choix d’immeubles.</p>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
				<div
					className="ltn__banner-item ltn__banner-style-4 text-color-white bg-image"
					data-bs-bg={publicUrl + "assets/img/gallery/warehouse.jpg"}
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
						<Link to="" style={{ color: "black" }}>Hangars/Dépôt</Link>
					</h6>
					<p style={{
					marginTop: "-20px",
				}}>Découvrez l'ensemble des propriétés disponibles.</p>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
				<div
					className="ltn__banner-item ltn__banner-style-4 text-color-white bg-image"
					data-bs-bg={publicUrl + "assets/img/gallery/enterprise.jpg"}
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
						<Link to="" style={{ color: "black" }}>Entreprise</Link>
					</h6>
					<p style={{
					marginTop: "-20px",
				}}>Concrétisez votre projet de restaurant, commerce et bien plus encore.</p>
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
      <Link to="" style={{ color: "white", textDecoration: "none" }}>
        Voir toutes les propriétés a louer
      </Link>
    </div>
			</div>
			
			
        }
}

export default CategoryV3