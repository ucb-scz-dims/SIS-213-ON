import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { ORDER_STATUS } from "../../config/order-status";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const CardActions = ({ data = {}, actions = {} }) => {
  const [isManageableOrder, setManageableOrder] = useState(false);
  const [isOrder, setOrder] = useState(false);
  const [isOther, setOther] = useState(false);

  const defineType = () => {
    if (actions.onOpenDetailModal != null) {
      setOrder(true);
    }
    if (actions.onOpenConfirmationModal != null) {
      setManageableOrder(true);
    }
    if (data.price) {
      setOther(true);
    }
  };

  useEffect(() => {
    defineType();
  }, []);
  return (
    <>
      {isOrder && (
        <div className="w-100 flex space-x-2">
          {isManageableOrder && (
            <>
              <Button
                text="Aceptar"
                onClick={() =>
                  actions.onOpenConfirmationModal(
                    data.id,
                    ORDER_STATUS.ACCEPTED
                  )
                }
                disabled={data.state_type_id !== ORDER_STATUS.PENDING}
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 font-bold disabled:opacity-20 rounded-full"
              />
              <Button
                text="Rechazar"
                onClick={() =>
                  actions.onOpenConfirmationModal(
                    data.id,
                    ORDER_STATUS.CANCELED
                  )
                }
                disabled={data.state_type_id !== ORDER_STATUS.PENDING}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 font-bold disabled:opacity-20 rounded-full"
              />
            </>
          )}
          <Button
            text="Ver detalle"
            onClick={() => actions.onOpenDetailModal(data.id)}
            // disabled={data.state_type_id !== ORDER_STATUS.PENDING}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 font-bold disabled:opacity-20 rounded-full"
          />
        </div>
      )}
      {isOther && (
        <Link
          to={`/product/${data.id}/update`}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Editar
        </Link>
      )}
    </>
  );
};

export default CardActions;
