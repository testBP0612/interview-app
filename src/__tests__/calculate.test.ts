import { OrderCalculator, DefaultDiscountCalculator, TransportationCalculator } from '@/calculate';

const order = {
  items: [
    { product: 'apple', price: 50, quantity: 1 },
    { product: 'banana', price: 50, quantity: 1 },
  ],
  transportation: 100,
};

const order_free_transportation = {
  items: [
    { product: 'apple', price: 50, quantity: 10 },
    { product: 'banana', price: 50, quantity: 2 },
  ],
  transportation: 100,
};

const order_discount = {
  items: [
    { product: 'apple', price: 5000, quantity: 1 },
    { product: 'banana', price: 1000, quantity: 1 },
  ],
  transportation: 100,
};

describe('計算訂單金額', () => {
  test('訂單金額計算正確', () => {
    const discountCalculator = new DefaultDiscountCalculator();
    const transportationCalculator = new TransportationCalculator();
    const orderCalculator = new OrderCalculator(discountCalculator, transportationCalculator);

    const total = orderCalculator.calculate(order);
    expect(total).toBe(200);
  });

  test('訂單金額計算正確(免運費)', () => {
    const discountCalculator = new DefaultDiscountCalculator();
    const transportationCalculator = new TransportationCalculator();
    const orderCalculator = new OrderCalculator(discountCalculator, transportationCalculator);

    const total = orderCalculator.calculate(order_free_transportation);
    expect(total).toBe(600);
  });

  test('訂單金額打套用折扣', () => {
    const discountCalculator = new DefaultDiscountCalculator();
    const transportationCalculator = new TransportationCalculator();
    const orderCalculator = new OrderCalculator(discountCalculator, transportationCalculator);

    const total = orderCalculator.calculate(order_discount);
    expect(total).toBe(4900);
  });
});
