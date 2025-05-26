import { useRef, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { ORDER_STATUS } from "../../config/order-status";
import Button from "../../components/Button/Button";
import CardActions from "../card-actions/card-action";

const OrderCard = ({ 
  order, 
  onOpenDetailModal, 
  onOpenConfirmationModal 
}) => {
  return (
    <div
      key={order.id}
      className="bg-white border border-gray-200 py-4 px-5 rounded-1xl shadow hover:shadow-md transition-all duration-200 flex flex-col md:grid md:grid-cols-11 items-center gap-2 md:gap-4 text-sm"
    >
      <div className="w-12 font-bold text-indigo-600">#{order.id}</div>
      <div className="w-28">{formatDate(order.date)}</div>
      <div className="col-span-3 truncate">{order.address}</div>
      <div className="w-28">{order.consumer_name}</div>
      <div className="w-20 font-medium text-green-700 text-right">
        Bs. {order.total_price.toFixed(2)}
      </div>
      <div className="w-24">{order.status}</div>
      <CardActions data={order} actions={{onOpenConfirmationModal, onOpenDetailModal}} />
    </div>
  );
};

export default OrderCard;