import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Login from './section-components/loginadmin';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const LoginV2 = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Account" subheader="Login" />
        <Login />
        <Footer />
    </div>
}

export default LoginV2