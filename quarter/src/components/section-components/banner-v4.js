import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class BannerV4 extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'
        let imagealt = 'image'

    return  <div className="ltn__slider-area ltn__slider-2--- ltn__slider-6 section-bg-2">
				<div className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1 arrow-white">
				{/* ltn__slide-item */}
				<div className="ltn__slide-item ltn__slide-item-2--- ltn__slide-item-6 text-color-white bg-image bg-overlay-theme-black-60" data-bs-bg={publicUrl+"assets/img/slider/14.jpg"}>
					<div className="ltn__slide-item-inner text-center">
					<div className="container">
						<div className="row">
						<div className="col-lg-12 align-self-center">
							<div className="slide-item-info">
							<div className="slide-item-info-inner ltn__slide-animation">
								
								<h6 className="slide-sub-title white-color animated"><span><i className="fas fa-home" /></span> Keurgui</h6>
								<h1 className="slide-title text-uppercase animated ">Trouver votre <br /> maison de reve avec nous</h1>
							</div>
							</div>
						</div>
						</div>
					</div>
					</div>
				</div>
				</div>
			</div>
        }
}

export default BannerV4