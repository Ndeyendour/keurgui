import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, HashRouter, Route, Routes } from 'react-router-dom';
import HomeV1 from './components/home-v1';
import HomeV2 from './components/home-v2';
import HomeV3 from './components/home-v3';
import HomeV4 from './components/home-v4';
import HomeV5 from './components/home-v5';
import HomeV6 from './components/home-v6';
import HomeV7 from './components/home-v7';
import HomeV8 from './components/home-v8';
import HomeV9 from './components/home-v9';
import HomeV10 from './components/home-v11';
import { FavoritesProvider } from './components/global-components/FavoritesContext';
import About from './components/about';
import Service from './components/service';
import ServiceDetails from './components/service-details';
import Portfolio from './components/portfolio';
import PortfolioV2 from './components/portfolio-v2';
import PortfolioDetails from './components/portfolio-details';
import Team from './components/team';
import TeamDetails from './components/team-details';
import Faq from './components/faq';
import ComingSoon from './components/coming-soon';
import Error from './components/404';
import Location from './components/location';

import Shop from './components/shop';
import ShopGrid from './components/shop-grid';
import ProdductDetails from './components/product-details';
import ShopLeftSidebar from './components/shop-left-sidebar';
import ShopRightSidebar from './components/shop-right-sidebar';

import BlogGrid from './components/blog-grid';
import BlogLeftSidebar from './components/blog-left-sidebar';
import BlogRightSidebar from './components/blog-right-sidebar';
import Blog from './components/blog';

import BlogDetails from './components/blog-details';
import Contact from './components/contact';
import Cart from './components/cart';
import Checkout from './components/checkout';
import MyAccount from './components/my-account';
import Login from './components/login';
import LoginAdmin from './components/loginadmin';
import LoginAgent from './components/section-components/loginagent';
import Register from './components/register';
import AddListing from './components/add-listing';
import Wishlist from './components/wishlist';
import OrderTracking from './components/order-tracking';
import Admin from './components/admin';
import Adminprop from './components/section-components/adminprop';
import AdminPropDetail from './components/section-components/adminpropdetails';
import GaleriePage from './components/shop-components/GaleriePage';
import CartePage from './components/shop-components/CartePage';
import SommairePage from './components/shop-components/SommairePage';
import ResultsPage from './components/shop-components/ResultsPage';
import PropertyImagesPage from './components/shop-components/PropertyImagesPage';
import RealEstateForm from './components/RealEstateForm';
import FavoritesPage from './components/FavoritesPage';
import Adminpropalouer from './components/section-components/adminpropalouer';
import EditProperty from './components/section-components/EditProperty';
import AddProperty from './components/section-components/AddProperty';
import Chalets from './components/section-components/chalets';
import AgentsList from './components/section-components/AgentsList';
import EditAgent from './components/section-components/EditAgent';
import AddAgent from './components/section-components/AddAgent';
import UserList from './components/section-components/UserList';

class Root extends Component {
  render() {
    return (
      <FavoritesProvider>
        <HashRouter basename="/">
          <div>
            <Routes>
              <Route path="/results/:searchTerm" element={<ResultsPage />} />
              <Route path="/" element={<HomeV4 />} />
              <Route path="/home-v2" element={<HomeV2 />} />
              <Route path="/home-v3" element={<HomeV3 />} />
              <Route path="/home-v4" element={<HomeV4 />} />
              <Route path="/home-v5" element={<HomeV5 />} />
              <Route path="/home-v6" element={<HomeV6 />} />
              <Route path="/home-v7" element={<HomeV7 />} />
              <Route path="/home-v8" element={<HomeV8 />} />
              <Route path="/home-v9" element={<HomeV9 />} />
              <Route path="/home-v10" element={<HomeV10 />} />
              <Route path="/adpropdet" element={<AdminPropDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/agent" element={<Service />} />
              <Route path="/service-details" element={<ServiceDetails />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio-v2" element={<PortfolioV2 />} />
              <Route path="/portfolio-details" element={<PortfolioDetails />} />
              <Route path="/team" element={<Team />} />
              <Route path="/team-details" element={<TeamDetails />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/404" element={<Error />} />
              <Route path="/location" element={<Location />} />
              <Route path="/louer" element={<Shop />} />
              <Route path="/vendre" element={<ShopGrid />} />
              <Route path="/shop-left-sidebar" element={<ShopLeftSidebar />} />
              <Route path="/product/:id" element={<ProdductDetails />} />
              <Route path="/blog-grid" element={<BlogGrid />} />
              <Route path="/blog-left-sidebar" element={<BlogLeftSidebar />} />
              <Route path="/blog-right-sidebar" element={<BlogRightSidebar />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/galerie" element={<GaleriePage />} />
              <Route path="/carte" element={<CartePage />} />
              <Route path="/sommaire" element={<SommairePage />} />
              <Route path="/property-images/:id" element={<PropertyImagesPage />} />
              <Route path="/blog-details" element={<BlogDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/adminpv" element={<Adminprop />} />
              <Route path="/adminpa" element={<Adminpropalouer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/loginadmin" element={<LoginAdmin />} />
              <Route path="/loginagent" element={<LoginAgent />} />
              <Route path="/register" element={<Register />} />
              <Route path="/add-listing" element={<AddListing />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/order-tracking" element={<OrderTracking />} />
              <Route path="/form" element={<RealEstateForm />} />
              <Route path="/mes-favoris" element={<FavoritesPage />} />
              <Route path="/edit-property/:id" element={<EditProperty />} />
              <Route path="/ajoutp" element={<AddProperty />} />
              <Route path="/chalet" element={<Chalets />} />
              <Route path="/agnts" element={<AgentsList />} />
              <Route path="/edit-agent/:id" element={<EditAgent />} />
              <Route path="/add-agent" element={<AddAgent />} />
              <Route path="/users" element={<UserList />} />
            </Routes>
          </div>
        </HashRouter>
      </FavoritesProvider>
    );
  }
}

export default Root;

ReactDOM.render(<Root />, document.getElementById('quarter'));
