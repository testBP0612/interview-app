import './App.css';

import Cart from '@/components/Cart';
import mockData from '@/components/Cart/__mocks__/cart.json';

const cartData = mockData;

function App() {
  return (
    <div className="container">
      <Cart cart={cartData.cart} />
    </div>
  );
}

export default App;
