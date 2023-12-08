import React, { useState } from 'react';
import Header from './Header';
import Menu from './Menu';
import Order from './Order';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const MENU_ITEMS = [
  { id: 1, name: 'Burger', price: 60, image: 'juicy_burger.jpg' },
  { id: 2, name: 'Fries', price: 25, image: 'french_fries.jpg' },
  { id: 3, name: 'Drink', price: 20, image: 'soft_drinks.jpg' },
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
  
      // Set the text color of "Menu" and "Your Order"
      document.documentElement.style.setProperty('--header-text-color', newTheme === 'light' ? '#333' : 'white');
  
      // Set the text color of table headers
      document.documentElement.style.setProperty('--table-header-text-color', newTheme === 'light' ? '#333' : 'white');
  
      // Set the background color of buttons
      document.documentElement.style.setProperty('--button-bg-color', newTheme === 'light' ? '#333' : '#ddd');
  
      // Set the background color of the app
      document.documentElement.style.setProperty('--app-bg-color', newTheme === 'light' ? '#9370db' : ''); 
  
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
      <Header toggleTheme={toggleTheme} />
      <Menu menuItems={MENU_ITEMS} addToOrder={addToOrder} />
      <Order order={order} removeItem={removeItem} calculateTotal={calculateTotal} />
    </div>
  );
};

export default App;
