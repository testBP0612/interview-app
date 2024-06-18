import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Cart from '@/components/Cart';
import { SHOPPING_THRESHOLD, SHOPPING_COST } from '@/constant/Cart';
import * as josn from '@/components/Cart/__mocks__/cart.json';

const cartData = josn;

test('Cart names an price', () => {
  render(<Cart cart={cartData.cart} />);

  expect(screen.getByText('Laptop')).toBeInTheDocument();
  expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
  expect(screen.getByText('Keyboard')).toBeInTheDocument();

  expect(screen.getByText('999.99')).toBeInTheDocument();
  expect(screen.getByText('25.99')).toBeInTheDocument();
  expect(screen.getByText('49.99')).toBeInTheDocument();
});

test('Cart item with zero price', () => {
  const cartWithZeroPrice = {
    cart: {
      items: [
        ...cartData.cart.items,
        {
          id: '4',
          name: 'Mouse Pad',
          price: 0,
          quantity: 1,
        },
      ],
    },
  };
  render(<Cart cart={cartWithZeroPrice.cart} />);

  expect(screen.getByText('Free item')).toBeInTheDocument();
});

test('Cart quantity', () => {
  render(<Cart cart={cartData.cart} />);

  expect(screen.getByTestId('quantity-1')).toHaveTextContent('1');
  expect(screen.getByTestId('quantity-2')).toHaveTextContent('2');
  expect(screen.getByTestId('quantity-3')).toHaveTextContent('1');
});

test('Cart subtotal', () => {
  render(<Cart cart={cartData.cart} />);

  const subtotal = cartData.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  expect(screen.getByText(subtotal.toString())).toBeInTheDocument();
});

test('Cart total with shipping cost', () => {
  render(<Cart cart={cartData.cart} />);
  const subtotal = cartData.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal >= SHOPPING_THRESHOLD ? subtotal : subtotal + SHOPPING_COST;
  expect(screen.getByText(total.toString())).toBeInTheDocument();
});

test('Does not render items with zero quantity', () => {
  render(<Cart cart={cartData.cart} />);

  expect(screen.queryByText('Empty item')).not.toBeInTheDocument();
});
