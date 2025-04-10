import React from 'react';
import BusinessTypeCard from '../components/BusinessTypeCard';
import CardSlider from '../components/CardSlider';

const Home = () => {
  return (
    <>
      <div className="flex justify-center w-full ">
        <div className="w-full max-w-3xl p-4">
          <h2 className="text-xl font-bold text-left">Bienvenido. ¿Que vas a pedir hoy?</h2>
        </div>
      </div>

      <CardSlider>
        <BusinessTypeCard name="Restaurantes" bgColor="bg-amber-400" imagePath="burger.png" url={"restaurantes"} />
        <BusinessTypeCard />
        <BusinessTypeCard />
        <BusinessTypeCard />
        <BusinessTypeCard />
      </CardSlider>
    </>
  );
};

export default Home;

