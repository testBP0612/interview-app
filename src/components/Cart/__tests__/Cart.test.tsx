import { render, screen, fireEvent } from '@testing-library/react';

import json from '@/components/Cart/__mocks__/cart.json';
import { SHOPPING_THRESHOLD, SHOPPING_COST } from '@/constant/Cart';
import Cart from '@/components/Cart';

const cartData = json;

test('購物車商品金額計算正確', () => {
  render(<Cart cart={cartData.cart} />);
  const subtotal = cartData.cart.items.reduce((acc, item) => item.price * item.quantity + acc, 0);
  const total = subtotal > SHOPPING_THRESHOLD ? subtotal : subtotal + SHOPPING_COST;
  expect(screen.getByText(total)).toBeInTheDocument();
});

test('按下商品數量增加按鈕', () => {
  render(<Cart cart={cartData.cart} />);

  cartData.cart.items.forEach((item) => {
    const addButton = screen.getByRole('button', { name: `Add ${item.name}` });
    fireEvent.click(addButton);
    expect(screen.getByLabelText(`${item.name} Quantity`).textContent).toBe((item.quantity + 1).toString());
  });
});

test('按下商品數量減少按鈕', () => {
  render(<Cart cart={cartData.cart} />);

  cartData.cart.items.forEach((item) => {
    const reduceButton = screen.getByRole('button', { name: `Reduce ${item.name}` });
    fireEvent.click(reduceButton);
    const newQuantity = Math.max(item.quantity - 1, 1);
    expect(screen.getByLabelText(`${item.name} Quantity`).textContent).toBe(newQuantity.toString());
  });
});

test('按下刪除商品按鈕', () => {
  render(<Cart cart={cartData.cart} />);

  cartData.cart.items.forEach((item) => {
    const removeButton = screen.getByRole('button', { name: `Remove ${item.name}` });
    fireEvent.click(removeButton);
    expect(screen.queryByText(item.name)).not.toBeInTheDocument();
  });
});
