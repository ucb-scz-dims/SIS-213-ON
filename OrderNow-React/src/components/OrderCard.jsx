import friedChickenImage from "../assets/images/pollo.jfif";

function OrderCard(props) {
  return (
    <div className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 w-full max-w-6xl h-[168px] overflow-hidden mx-auto mt-1">
      {/* Imagen del producto */}
      <div>
        <img className="w-1/1" src={friedChickenImage} alt="Product" />
        <p></p>
      </div>

      {/* Contenedor de información */}
      <div className="p-5 w-2/3 h-full flex">
        <div className="flex-col flex justify-around">
          <h5 className="text-lg font-bold text-gray-900 dark:text-white">
            Pollo
          </h5>{" "}
          {/*Nombre del producto*/}
          <p className="text-sm text-gray-700 dark:text-gray-400 text-ellipsis">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
            distinctio!
          </p>{" "}
          {/*Descripcion del producto*/}
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Bs. 20
          </span>
          {/*Precio*/}
        </div>
      </div>

      {/* Sección de precio y cantidad */}
      <div className="flex items-center py-4 flex-col">
        <a className="p-1 text-lg font-bold text-gray-900 dark:text-white">Cantidad</a>
        <div className="flex items-center space-x-2">
          <button className=" bg-black text-white rounded-lg hover:bg-red-800 w-8 h-8">
            -
          </button>
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            1
          </span>{" "}
          {/*Cantidad*/}
          <button className=" bg-black text-white rounded-lg hover:bg-green-800 w-8 h-8">
            +
          </button>
        </div>
        <a className="p-1 text-gray-900 dark:text-gray-600">Eliminar</a>
      </div>
    </div>
  );
}

export default OrderCard;
