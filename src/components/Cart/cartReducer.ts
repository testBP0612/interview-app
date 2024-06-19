import { CartItem } from '@/components/Cart/cartTypes';

export enum CartActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  REDUCE_ITEM = 'REDUCE_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
}

interface CartAction {
  type: CartActionTypes;
  payload: { id: string };
}

export default function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    case CartActionTypes.REDUCE_ITEM:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: Math.max(item.quantity - 1, 1) };
        }
        return item;
      });
    case CartActionTypes.REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
}
