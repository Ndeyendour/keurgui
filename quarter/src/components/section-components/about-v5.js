import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class AboutV5 extends Component {
    render() {
        let publicUrl = process.env.PUBLIC_URL + '/';

        return (
            <div className="ltn__about-us-area pb-115 go-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 align-self-center">
                            <div className="about-us-img-wrap ltn__img-shape-left about-img-left">
                                <img src={publicUrl + "assets/img/service/jd.png"} alt="Image" />
                            </div>
                        </div>
                        <div className="col-lg-7 align-self-center">
                            <div className="about-us-info-wrap">
                                <div className="section-title-area ltn__section-title-2--- mb-20">
                                    <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Bienvenue sur Keurgui</h6>
                                    <h1 className="section-title">Une révolution dans le secteur locatif au Sénégal<span>.</span></h1>
                                    <p>Cher(e) Utilisateur(trice),</p>
                                    <p>
                                        C’est avec un immense plaisir que je vous présente <strong>Keurgui</strong>, une plateforme innovante dédiée à la transformation du secteur locatif au Sénégal. En tant que CEO et fondateur de JD Immo, je suis fier de vous dévoiler ce site pour répondre efficacement aux besoins des locataires et des propriétaires.
                                    </p>
                                </div>
                                <div className="about-us-info-wrap-inner about-us-info-devide---">
                                    <p>
                                        <strong>Keurgui</strong> ne se limite pas à une simple plateforme de gestion locative. Nous avons fixé des objectifs stratégiques qui vont bien au-delà, en nous concentrant sur plusieurs axes essentiels :
                                    </p>
                                    <ul>
                                        <li><strong>Accessibilité Financière :</strong> Des solutions de paiement flexibles et des options de financement adaptées pour faciliter l’accès au logement.</li>
                                        <li><strong>Transparence :</strong> Visibilité totale sur les transactions, contrats et conditions de location, favorisant la confiance entre locataires et propriétaires.</li>
                                        <li><strong>Sécurité :</strong> Technologies de pointe pour la protection des données et transactions sécurisées.</li>
                                        <li><strong>Innovation :</strong> Intégration des dernières technologies : outils de recherche avancés, visites virtuelles, systèmes de gestion automatisés.</li>
                                    </ul>
                                    <p>
                                        Grâce à <strong>Keurgui</strong>, nous offrons une expérience de location améliorée et inclusive, où chaque utilisateur peut trouver la propriété qui répond parfaitement à ses besoins dans un environnement sûr et transparent.
                                    </p>
                                    <p>
                                        Je vous invite à explorer <strong>Keurgui</strong> et à découvrir comment notre plateforme peut transformer votre recherche de logement ou la gestion de vos biens immobiliers.
                                    </p>
                                    <p><strong>Joseph DIÉMÉ</strong><br/>CEO et Fondateur - JD Immo</p>
                                </div>
                                <div className="btn-wrapper animated">
                                    <Link to="/about" className="theme-btn-1 btn btn-effect-1 text-uppercase">En savoir plus</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutV5;