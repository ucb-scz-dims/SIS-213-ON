import React, { useState } from 'react';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import Button from '../components/atoms/Button';
import MapModal from '../components/MapModal';

const Layout = ({ children }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="h-20" />
      <main className="flex-grow">
        {children}
      </main>
      <div className="fixed bottom-4 right-4">
        <Button
          label="Ver Mapa"
          onClick={() => setIsMapOpen(true)}
          className="shadow-lg"
        />
      </div>
      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        origin={{ lat: -17.7833, lng: -63.1833 }}
        destination={{ lat: -17.7933, lng: -63.1933 }}
      />
      <Footer />
    </div>
  );
}

export default Layout;
