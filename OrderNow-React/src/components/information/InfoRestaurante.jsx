import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getSupaBaseClient from '/src/supabase-client.js';

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const { id } = useParams();
  const supaBaseCom = getSupaBaseClient('com');
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const { data, error } = await supaBaseCom
          .from('businesses')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error al obtener el negocio:', error.message);
          alert('Error al obtener los datos del negocio.');
          return;
        }

        setBusiness(data);
      } catch (error) {
        console.error('Error inesperado:', error);
        alert('Error inesperado al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBusiness();
    }
  }, [id]);

  if (!isOpen) return null;
  if (loading) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6">
        <div className="text-center">Cargando detalles...</div>
      </div>
    </div>
  );
  
  if (!business) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6">
        <div className="text-center">No se encontró el negocio.</div>
      </div>
    </div>
  );

  const { name, description, address, open_time, close_time } = business;

  return (
    <>
      <div 
        className="fixed inset-0 bg-gray-900/90 z-40" 
        onClick={onClose} 
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="bg-white rounded-lg max-w-md w-full mx-4 pointer-events-auto">
          <div className="flex flex-col p-6">
            {/* Close button */}
            <div className="flex justify-end mb-2">
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <div className="border rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium">Ubicación del restaurante</h3>
              <p className="text-sm mt-2">{address || 'No disponible'}</p>
            </div>
            
            <div className="flex mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-md mr-4 flex-shrink-0">
                {business.logo_url ? (
                  <img 
                    src={business.logo_url} 
                    alt={name} 
                    className="w-full h-full object-cover rounded-md"
                  /> 
                ) : (
                  <span className="text-xs text-gray-500 flex items-center justify-center h-full">IMG</span>
                )}
              </div>
              
              <div>
                <h2 className="text-lg font-medium">{name || 'Sin nombre'}</h2>
                <p className="text-sm text-gray-600">{description || 'Sin descripción'}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Servicios</h3>
              <ul className="text-sm space-y-1">
                {business.has_delivery && <li>Delivery por OrderNow</li>}
                {business.has_pickup && <li>Retiro en Local</li>}
                {(!business.has_delivery && !business.has_pickup) && <li>No hay servicios disponibles</li>}
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Horarios</h3>
              <ul className="text-sm space-y-1">
                <li>Lunes: {open_time || '00:00'} - {close_time || '00:00'}</li>
                <li>Martes: {open_time || '00:00'} - {close_time || '00:00'}</li>
                <li>Miércoles: {open_time || '00:00'} - {close_time || '00:00'}</li>
                <li>Jueves: {open_time || '00:00'} - {close_time || '00:00'}</li>
                <li>Viernes: {open_time || '00:00'} - {close_time || '00:00'}</li>
                <li>Sábado: {open_time || '00:00'} - {close_time || '00:00'}</li>
                <li>Domingo: {open_time || '00:00'} - {close_time || '00:00'}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Medios de Pago</h3>
              <ul className="text-sm space-y-1">
                {business.payment_methods ? (
                  business.payment_methods.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))
                ) : (
                  <>
                    <li>Efectivo</li>
                    <li>Tarjeta</li>
                    <li>QR</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;