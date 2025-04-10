import { createContext, useContext, useReducer } from "react";

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
        if (t.id === action.task.id) {
          return action.task;
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

const fakeProducts = [
  {
    id: 1,
    srcImage:
      "https://upload.wikimedia.org/wikipedia/commons/a/a5/Roast_chicken.jpg",
    title: "Pollos Campeón",
    description:
      "Pollo Campeón es un restaurante que sirve pollo a la brasa y es conocido por su salsa picante.",
    price: 10,
    quantity: 1,
  },
  {
    id: 2,
    srcImage:
      "https://upload.wikimedia.org/wikipedia/commons/a/a5/Roast_chicken.jpg",
    title: "Pollos Campeón",
    description:
      "Pollo Campeón es un restaurante que sirve pollo a la brasa y es conocido por su salsa picante.",
    price: 20,
    quantity: 4,
  },
  {
    id: 3,
    srcImage:
      "https://upload.wikimedia.org/wikipedia/commons/a/a5/Roast_chicken.jpg",
    title: "Pollos Campeón",
    description:
      "Pollo Campeón es un restaurante que sirve pollo a la brasa y es conocido por su salsa picante.",
    price: 30,
    quantity: 5,
  },
];
