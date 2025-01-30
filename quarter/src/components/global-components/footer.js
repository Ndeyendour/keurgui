import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Social from '../section-components/social';
import Copyright from './copyright';

class Footer_v1 extends Component {
    componentDidMount() {
        const $ = window.$;
        let publicUrl = process.env.PUBLIC_URL + '/';
        const minscript = document.createElement("script");
        minscript.async = true;
        minscript.src = publicUrl + "assets/js/main.js";
        document.body.appendChild(minscript);

        $('.go-top').find('a').on('click', function () {
            $(".quarter-overlay").fadeIn(1);
            $(window).scrollTop(0);
            setTimeout(function(){
                $(".quarter-overlay").fadeOut(300);
            }, 800);
        });

        $(document).on('click', '.theme-btn-1', function(){ 
            $('div').removeClass('modal-backdrop show fade');
            $('body').attr("style", "");
        });
    }

    render() {
        let publicUrl = process.env.PUBLIC_URL + '/';
        return (
            <footer className="ltn__footer-area">
                <div className="footer-top-area section-bg-2 plr--5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-4 col-md-6 col-sm-6 col-12">
                                <h4 className="footer-title">À PROPOS DE KEURGUI</h4>
                                <p>Keurgui est une plateforme qui met à disposition des courtiers immobiliers du Senegal une gamme complète d’outils et de solutions technologiques adaptées à leurs besoins.</p>
                                <Link to="/about">En savoir plus sur Keurgui</Link>
                                <Social />
                            </div>
                            <div className="col-xl-4 col-md-6 col-sm-6 col-12">
                                <h4 className="footer-title">REJOIGNEZ-NOUS</h4>
                                <p>Vous souhaitez évoluer dans un environnement de travail dynamique et enrichissant ? Nous proposons diverses opportunités pour rejoindre notre équipe.</p>
                                <Link to="/careers">Consultez nos offres d'emploi</Link>
                                <Link to="/regions">Découvrez nos régions</Link>
                            </div>
                            <div className="col-xl-4 col-md-6 col-sm-6 col-12">
                                <h4 className="footer-title">NOUS CONTACTER</h4>
                                <p>Vous avez une question ou souhaitez nous faire part de vos commentaires ? Remplissez simplement notre formulaire de contact pour nous joindre.</p>
                                <Link to="/contact">Nous contacter</Link>
                                <Link to="/sitemap">Plan du site</Link>
                                <Link to="/privacy">Mentions légales et politique de confidentialité</Link>
                                <Link to="/cookies">Gestion des cookies</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Copyright />
            </footer>
        );
    }
}

export default Footer_v1;