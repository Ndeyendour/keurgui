import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class CallToActonV3 extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'
        let imagealt = 'image'

    return <div className="ltn__call-to-action-area ltn__call-to-action-4 bg-image pt-115 pb-120 mb-120" data-bs-bg={publicUrl+"assets/img/bg/19.jpg"}>
				<div className="container">
				<div className="row">
					<div className="col-lg-12">
					<div className="call-to-action-inner call-to-action-inner-4 text-center">
						<div className="section-title-area ltn__section-title-2">
						<h6 className="section-subtitle ltn__secondary-color"></h6>
						<h1 className="section-title white-color">Facilitez votre recherche en <br/> vous créant un compte</h1>
						</div>
						<div className="btn-wrapper">
						 <span className="go-top"><Link to="/register" className="btn btn-transparent btn-effect-4 white-color"
						  style={{
							position: "absolute",
						   
							left: "50%",
							transform: "translateX(-50%)",
							backgroundColor: "black",
							padding: "10px 20px",
							borderRadius: "20px",
						  }}
						 >Creer un compte</Link></span>
						</div>
					</div>
					</div>
				</div>
				</div>
				<div className="ltn__call-to-4-img-1">
				</div>
				<div className="ltn__call-to-4-img-2">
				</div>
			</div>
        }
}

export default CallToActonV3