import friedChickenImage from '../assets/images/pollo.jfif'

function OrderCard(props) {
 
  return (
    <div 
      className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 w-full max-w-6xl h-[168px] overflow-hidden mx-auto mt-1"
    >
      {/* Imagen del producto */}
      <div>
        <img 
        className="w-1/1" 
        src={friedChickenImage}
        alt="Product" 
        />
        <p>
        </p>
      </div>
      
      {/* Contenedor de información */}
      <div className="p-5 flex flex-col w-2/3 justify-between">
        <div>
          <h5 className="text-lg font-bold text-gray-900 dark:text-white">Pollo</h5> {/*Nombre del producto*/}
          <p className="text-sm text-gray-700 dark:text-gray-400 truncate">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, distinctio!</p> {/*Descripcion del producto*/}
        </div>
        
        {/* Sección de precio y cantidad */}
        <div className="flex items-center justify-between py-4">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Bs. 20</span>{/*Precio*/}
          <div className="flex items-center space-x-2">
            <button 
              className=" bg-black text-white rounded-lg hover:bg-red-700 w-8 h-8"
            >
              -
            </button>
            <span className="text-lg font-medium text-gray-900 dark:text-white">1</span> {/*Cantidad*/}
            <button 
              className=" bg-black text-white rounded-lg hover:bg-red-700 w-8 h-8"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
