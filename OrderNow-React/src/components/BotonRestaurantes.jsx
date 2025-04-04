import { Link } from 'react-router-dom';

const BotonRestaurantes = () => {
  return (
    <Link to="/restaurantes">
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-2xl hover:bg-blue-600 transition-colors duration-300">
        Restaurantes
      </button>
    </Link>
  );
};

export default BotonRestaurantes;
