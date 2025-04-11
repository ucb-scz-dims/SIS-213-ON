import React from 'react';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="pt-16 pb-16">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;