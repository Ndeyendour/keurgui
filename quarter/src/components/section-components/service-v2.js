import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import './service.css';


const ServiceV2 = () => {
  return (
	<div className="service-section" style={{ padding: '60px 0', textAlign: 'center' }}>
	<div className="container">
	  <div className="row">
		{/* Premier Bloc */}
		<div className="col-lg-4 col-md-6">
		  <div className="service-box">
			<FontAwesomeIcon icon={faHome} className="service-icon" />
			<h4>🏡 Trouvez votre futur logement</h4>
			<p>
			  Que vous cherchiez une maison, un appartement ou un terrain, explorez un vaste choix de biens 
			  à acheter ou à louer.
			</p>
		  </div>
		</div>

		{/* Deuxième Bloc */}
		<div className="col-lg-4 col-md-6">
		  <div className="service-box">
			<FontAwesomeIcon icon={faUsers} className="service-icon" />
			<h4>👥 Faites-vous accompagner par un expert</h4>
			<p>
			  Besoin de conseils ? Nos courtiers immobiliers sont là pour vous guider et vous aider à 
			  concrétiser votre projet en toute sérénité.
			</p>
		  </div>
		</div>

		{/* Troisième Bloc */}
		<div className="col-lg-4 col-md-6">
		  <div className="service-box">
			<FontAwesomeIcon icon={faLightbulb} className="service-icon" />
			<h4>💡 Tout savoir sur l’immobilier</h4>
			<p>
			  Restez informé des tendances du marché, des conseils pratiques et des actualités pour faire 
			  les meilleurs choix immobiliers.
			</p>
		  </div>
		</div>
	  </div>
	</div>
  </div>
  );
};

export default ServiceV2;
