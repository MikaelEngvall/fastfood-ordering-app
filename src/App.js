import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const MENU_ITEMS = [
  { id: 1, name: 'Burger', price: 60 },
  { id: 2, name: 'Fries', price: 25 },
  { id: 3, name: 'Drink', price: 20 },
];

const App = () => {
  const [order, setOrder] = useState([]);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      // Invert the theme when the button is clicked
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
  
      // Set the theme class on the body
      document.body.classList.toggle('dark-theme', newTheme === 'dark');
  
      return newTheme;
    });
  };
  
  const addToOrder = (menuItem) => {
    const existingItemIndex = order.findIndex((item) => item.id === menuItem.id);

    if (existingItemIndex !== -1) {
      const updatedOrder = [...order];
      updatedOrder[existingItemIndex].quantity += 1;
      setOrder(updatedOrder);
    } else {
      const newItem = { ...menuItem, quantity: 1 };
      setOrder([...order, newItem]);
    }
  };

  const removeItem = (itemId) => {
    const updatedOrder = order.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
    );

    setOrder(updatedOrder.filter((item) => item.quantity > 0));
  };

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>Fast Food Ordering App</h1>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </header>
      <section className="menu">
        <h2>Menu</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {MENU_ITEMS.map((menuItem) => (
              <tr key={menuItem.id}>
                <td>{menuItem.name}</td>
                <td>{menuItem.price.toFixed(2)} kr</td>
                <td>
                  <button onClick={() => addToOrder(menuItem)}>Add to Order</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="order">
        <h2>Your Order</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price.toFixed(2)} kr</td>
                <td>{item.quantity}</td>
                <td>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total: {calculateTotal()} kr</p>
      </section>
    </div>
  );
};

export default App;
