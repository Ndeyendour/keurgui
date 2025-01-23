import React from 'react';
import Navbar from './global-components/navbar-v2';
import Category from './section-components/category-v3';
import Service from './section-components/service-v2';
import CallToActionV3 from './section-components/call-to-action-v3';
import BlogSlider from './blog-components/blog-slider-v1';
import Footer from './global-components/footer';
import BannerV5 from './section-components/banner-v5';

const Home_V1 = () => {
    return <div>
        {/* <TopBar />  */}
        <Navbar /> 
        <BannerV5 />
       
        <Category />
        <Service/>
        <CallToActionV3/>
        
      
        
        <BlogSlider sectionClass="pt-90"  customClass="section-subtitle-2"/>
        <Footer />
    </div>
}

export default Home_V1

