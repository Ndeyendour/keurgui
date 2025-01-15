import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import navigateV1 from './section-components/navigate';
import WhyChooseUs from './section-components/why-choose-us';
import CallToActonV4 from './section-components/call-to-action-v4';
import BlogSlider from './blog-components/blog-slider-v1';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const navigate = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Our navigate" subheader="navigate"/>
        <navigateV1 />
        <WhyChooseUs />
        <CallToActonV4 />
        <BlogSlider customClass="pt-120"/>
        <CallToActionV1 />
        <Footer />
    </div>
}

export default navigate

