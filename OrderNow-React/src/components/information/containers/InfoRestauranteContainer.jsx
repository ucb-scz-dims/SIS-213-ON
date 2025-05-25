import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RestauranteFacade from '../facades/RestauranteFacade';
import InfoRestauranteView from '../components/InfoRestauranteView';

function InfoRestauranteContainer({ isOpen, onClose }) {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [biz, horarios] = await Promise.all([
          RestauranteFacade.obtenerRestaurantePorId(id),
          RestauranteFacade.obtenerHorarioPorRestaurante(id),
        ]);
        setBusiness(biz);
        setSchedule(horarios);
      } catch (e) {
        alert('Error al cargar los datos del restaurante');
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      cargarDatos();
    }
  }, [id, isOpen]);

  return (
    <InfoRestauranteView
      isOpen={isOpen}
      onClose={onClose}
      business={business}
      schedule={schedule}
      loading={loading}
    />
  );
}

export default InfoRestauranteContainer;
