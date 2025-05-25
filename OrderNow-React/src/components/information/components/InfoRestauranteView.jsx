const DAY_NAMES = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
  7: 'Domingo',
};

function InfoRestauranteView({ isOpen, onClose, business, schedule, loading }) {
  if (!isOpen) return null;

  if (loading) {
    return <div className="modal">Cargando detalles...</div>;
  }

  if (!business) {
    return <div className="modal">No se encontró el negocio.</div>;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900/90 z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="bg-white rounded-lg max-w-md w-full mx-4 pointer-events-auto">
          <div className="flex flex-col p-6">
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
              <p className="text-sm mt-2">{business.address || 'No disponible'}</p>
            </div>

            <div className="flex mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-md mr-4 flex-shrink-0">
                {business.logo_url ? (
                  <img
                    src={business.logo_url}
                    alt={business.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <span className="text-xs text-gray-500 flex items-center justify-center h-full">IMG</span>
                )}
              </div>

              <div>
                <h2 className="text-lg font-medium">{business.name}</h2>
                <p className="text-sm text-gray-600">{business.description || 'Sin descripción'}</p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Servicios</h3>
              <ul className="text-sm space-y-1">
                {business.has_delivery && <li>Delivery por OrderNow</li>}
                {business.has_pickup && <li>Retiro en Local</li>}
                {!business.has_delivery && !business.has_pickup && (
                  <li>No hay servicios disponibles</li>
                )}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Horarios</h3>
              <ul className="text-sm space-y-1">
                {Object.entries(DAY_NAMES).map(([num, name]) => (
                  <li key={num}>
                    {name}:{' '}
                    {(() => {
                      const entries = schedule[num] || [];
                      const realEntries = entries.filter(e => e !== '00:00 – 00:00');
                      if (realEntries.length === 0) {
                        return <span className="font-semibold">Cerrado</span>;
                      }
                      return realEntries.join('  |  ');
                    })()}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Medios de Pago</h3>
              <ul className="text-sm space-y-1">
                {business.payment_methods ? (
                  business.payment_methods.map((method, idx) => (
                    <li key={idx}>{method}</li>
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

export default InfoRestauranteView;
