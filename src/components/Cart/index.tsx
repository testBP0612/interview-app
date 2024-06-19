import { useReducer } from 'react';

import type { CartItem } from '@/components/Cart/cartTypes';
import cartReducer, { CartActionTypes } from '@/components/Cart/cartReducer';
import { SHOPPING_THRESHOLD, SHOPPING_COST } from '@/constant/Cart';

interface CartProductProps {
  item: CartItem;
  onAdd: (id: string) => void;
  onReduce: (id: string) => void;
  onRemove: (id: string) => void;
}

const CartProduct = ({ item, onAdd, onReduce, onRemove }: CartProductProps) => (
  <div>
    <span>{item.name}</span>
    <span>{item.price === 0 ? 'Free item' : item.price.toFixed(2)}</span>
    <div>
      <button aria-label={`Add ${item.name}`} onClick={() => onAdd(item.id)}>
        +
      </button>
      <span aria-label={`${item.name} Quantity`}>{item.quantity}</span>
      <button aria-label={`Reduce ${item.name}`} onClick={() => onReduce(item.id)}>
        -
      </button>
    </div>
    <button aria-label={`Remove ${item.name}`} onClick={() => onRemove(item.id)}>
      Remove
    </button>
  </div>
);

export interface CartProps {
  cart: {
    items: CartItem[];
  };
}

export default function Cart({ cart }: CartProps) {
  const [cartData, dispatch] = useReducer(cartReducer, cart.items);

  const handleAddItem = (id: string) => {
    dispatch({ type: CartActionTypes.ADD_ITEM, payload: { id } });
  };

  const handleReduceItem = (id: string) => {
    dispatch({ type: CartActionTypes.REDUCE_ITEM, payload: { id } });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: CartActionTypes.REMOVE_ITEM, payload: { id } });
  };

  const subtotal = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      {cartData.map((item) => (
        <CartProduct
          key={item.id}
          item={item}
          onAdd={handleAddItem}
          onReduce={handleReduceItem}
          onRemove={handleRemove}
        />
      ))}
      <div>
        <span>Subtotal: </span>
        <span>{subtotal}</span>
        <span>{subtotal >= SHOPPING_THRESHOLD ? 'Free Shipping' : `Shipping Cost: ${SHOPPING_COST}`}</span>
      </div>
    </div>
  );
}
