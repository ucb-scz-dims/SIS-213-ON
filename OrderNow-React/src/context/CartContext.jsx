import { createContext, useContext, useReducer } from "react";
import fakeProducts from "../fakeData/mockCart.json";

const CartContext = createContext(null);

const CartDispatchContext = createContext(null);

export function CartProvider({ children }) {
  const [cartList, dispatch] = useReducer(cartReducer, fakeProducts);

  return (
    <CartContext.Provider value={cartList}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export function useCartDispatch() {
  return useContext(CartDispatchContext);
}

function cartReducer(products, action) {
  switch (action.type) {
    case "added": {
      return [
        ...products,
        {
          id: action.id,
          srcImage: action.srcImage,
          title: action.title,
          description: action.description,
          price: action.price,
          quantity: action.quantity,
        },
      ];
    }
    case "changed": {
      return products.map((t) => {
        if (t.id === action.product.id) {
          return action.product;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return products.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}