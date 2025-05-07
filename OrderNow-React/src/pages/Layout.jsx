import React from 'react';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="h-20" />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
