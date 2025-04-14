import React from 'react';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="h-20" />
      {children}
      <Footer />
    </>
  );
}

export default Layout;