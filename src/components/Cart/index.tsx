import { SHOPPING_THRESHOLD, SHOPPING_COST } from '@/constant/Cart';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CartItem = ({ item }: { item: CartItem }) => (
  <div>
    <span>{item.name}</span>
    <span>{item.price === 0 ? 'Free item' : item.price.toFixed(2)}</span>
    <span data-testid={`quantity-${item.id}`}>{item.quantity}</span>
  </div>
);

export interface CartProps {
  cart: {
    items: CartItem[];
  };
}

export default function Cart({ cart }: CartProps) {
  const subtotal = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      {cart.items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <div>
        <span>Subtotal: </span>
        <span>{cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
        <span>{subtotal >= SHOPPING_THRESHOLD ? 'Free Shipping' : `Shipping Cost: ${SHOPPING_COST}`}</span>
      </div>
    </div>
  );
}
