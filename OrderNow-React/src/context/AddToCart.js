import { useCartDispatch } from './TasksContext.js';

export default function AddProduct(itemId, itemSrcImage, itemTitle, itemDesc, itemPrice, itemQuantity) {
  const dispatch = useCartDispatch();
  return (
    <button onClick={() => {
    dispatch({
        type: 'added',
        id: itemId,
        srcImage: itemSrcImage,
        title: itemTitle,
        description: itemDesc,
        price: itemPrice,
        quantity: itemQuantity,
    }); 
    }}>Add</button>
  );
}

//TODO: Integrar esto para cuando añadas productos al carrito