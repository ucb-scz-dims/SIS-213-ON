function Modal({ isOpen, onClose }) {
    if (!isOpen) return null;
  
    return (
      <>
        <div 
           className="fixed inset-0 bg-black-900/90 z-40" 
          onClick={onClose} 
        />
        
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6 pointer-events-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Información</h3>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="space-y-4">
              <p>Contenido del modal aquí...</p>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Modal;