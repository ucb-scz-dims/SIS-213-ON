import { useState } from "react";

function OrderCard({
  id,
  srcImage,
  title,
  description,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onDelete,
}) {
  const [quantityLocal, setQuantity] = useState(quantity);

  const handleIncrease = () => {
    const newQuantity = quantityLocal + 1;
    setQuantity(newQuantity);

    onIncrease(price);
  };

  const handleDecrease = () => {
    const newQuantity = quantityLocal - 1;
    setQuantity(newQuantity);

    onDecrease(price);
  };
  const handleDelete = () => {
    onDelete(quantityLocal, price, id);
  }
  return (
    <div className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 w-full max-w-6xl h-[168px] overflow-hidden mx-auto mt-1">
      {/* Imagen del producto */}
      <div className="object-cover max-w-2/9">
        <img className="w-1/1" src={srcImage} alt="Product" />
        <p></p>
      </div>

      {/* Contenedor de información */}
      <div className="p-5 w-2/3 h-full flex">
        <div className="flex-col flex justify-around">
          <h5 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h5>{" "}
          {/*Nombre del producto*/}
          <p className="text-sm text-gray-700 dark:text-gray-400 text-ellipsis">
            {description}
          </p>{" "}
          {/*Descripcion del producto*/}
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Bs. {price * quantityLocal}
          </span>
          {/*Precio*/}
        </div>
      </div>

      {/* Sección de precio y cantidad */}
      <div className="flex items-center py-4 h-full flex-col justify-around">
        <div className="flex flex-col">
          <a className="p-1 text-lg font-bold text-gray-900 dark:text-white">
            Cantidad
          </a>
          <div className="flex items-center space-x-2">
            <button
              className=" bg-black text-white rounded-lg enabled:hover:bg-red-500 w-8 h-8 disabled:cursor-not-allowed"
              onClick={handleDecrease}
              disabled={quantityLocal < 2 ? true : false}
            >
              -
            </button>
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              {quantityLocal}
            </span>
            <button
              className=" bg-black text-white rounded-lg hover:bg-green-500 w-8 h-8"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        </div>
        <a
          className="p-1 text-gray-900 dark:text-gray-400 hover:text-red-500 cursor-pointer"
          onClick={handleDelete}
        >
          Eliminar
        </a>
      </div>
    </div>
  );
}

export default OrderCard;
