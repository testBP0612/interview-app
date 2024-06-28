interface OrderItem {
  product: string;
  price: number;
  quantity: number;
}

interface Order {
  items: OrderItem[];
  transportation: number;
}

interface DiscountStrategy {
  calculate(subtotal: number): number;
}

interface TransportationStrategy {
  calculate(order: Order): number;
}

export class DefaultDiscountCalculator implements DiscountStrategy {
  private readonly threshold = 5000;
  private readonly discount = 0.8;

  calculate(subtotal: number): number {
    if (subtotal >= this.threshold) {
      return subtotal * this.discount;
    }
    return subtotal;
  }
}

export class BirthdayDiscountCalculator implements DiscountStrategy {
  private readonly threshold = 3000;
  private readonly discount = 0.7;

  calculate(subtotal: number): number {
    if (subtotal >= this.threshold) {
      return subtotal * this.discount;
    }
    return subtotal;
  }
}

export class TransportationCalculator implements TransportationStrategy {
  private readonly threshold = 3;

  calculate(order: Order): number {
    const totalQTY = order.items.reduce((acc, item) => acc + item.quantity, 0);
    if (totalQTY >= this.threshold) {
      return 0;
    }
    return order.transportation;
  }
}

export class OrderCalculator {
  private discountStrategy: DiscountStrategy;
  private transportationStrategy: TransportationStrategy;

  constructor(discountStrategy: DiscountStrategy, transportationStrategy: TransportationStrategy) {
    this.discountStrategy = discountStrategy;
    this.transportationStrategy = transportationStrategy;
  }

  calculate(order: Order): number {
    const subtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const discountAmount = this.discountStrategy.calculate(subtotal);
    const transportationCost = this.transportationStrategy.calculate(order);

    const total = discountAmount + transportationCost;
    return Math.floor(total);
  }
}
