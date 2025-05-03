import React from 'react';
import NavBar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;