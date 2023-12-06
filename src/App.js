import React, { useState } from 'react';
import './App.css'; 

const MENU_ITEMS = [
  { id: 1, name: 'Burger', price: 60  },
  { id: 2, name: 'Fries', price: 25 },
  { id: 3, name: 'Drink', price: 20 },
];

const App = () => {
  const [order, setOrder] = useState([]);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
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
    const updatedOrder = order.filter((item) => item.id !== itemId);
    setOrder(updatedOrder);
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
        <ul>
          {MENU_ITEMS.map((menuItem) => (
            <li key={menuItem.id}>
              {menuItem.name} - {menuItem.price.toFixed(2)}{' '}kr{' '}
              <button onClick={() => addToOrder(menuItem)}>Add to Order</button>
            </li>
          ))}
        </ul>
      </section>
      <section className="order">
        <h2>Your Order</h2>
        <ul>
          {order.map((item) => (
            <li key={item.id}>
              {item.name} x {item.quantity} - {item.price.toFixed(2)}{' '}kr{' '}
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: {calculateTotal()} kr</p>
      </section>
    </div>
  );
};

export default App;
