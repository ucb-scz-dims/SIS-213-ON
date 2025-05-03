import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";

const OrderResume = ({products = []}) => {
    const navigate = useNavigate();
    return (
        <div className="overflow-x-auto transition-all duration-300 ease-in-out mt-2">
            <div className="flex justify-end mb-2">
                <Button onClick={() => navigate(`/cart/test`)} type="button" label="editar pedido"/>
            </div>
            <table className="min-w-full text-sm text-gray-700">
                <thead>
                    <tr className="bg-gray-200 text-xs text-gray-600 uppercase tracking-wide">
                        <th className="px-3 py-2 text-left">Producto</th>
                        <th className="px-3 py-2 text-center">Cant.</th>
                        <th className="px-3 py-2 text-right">Precio Unit.</th>
                        <th className="px-3 py-2 text-right">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b border-gray-200 last:border-none">
                            <td className="px-3 py-2">{product.title}</td>
                            <td className="px-3 py-2 text-center">{product.quantity}</td>
                            <td className="px-3 py-2 text-right">Bs. {product.price.toFixed(2)}</td>
                            <td className="px-3 py-2 text-right">Bs. {(product.price * product.quantity).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderResume;