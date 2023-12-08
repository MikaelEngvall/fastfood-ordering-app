import React from 'react';

const Menu = ({ menuItems, addToOrder }) => {
  return (
    <section className="menu">
      <h2>Menu</h2>
      <div className="menu-cards">
        {menuItems.map((menuItem) => (
          <div key={menuItem.id} className="menu-card">
            <img src={menuItem.image} alt={menuItem.name} />
            <div className="menu-card-info">
              <p>{menuItem.name}</p>
              <p>{menuItem.price.toFixed(2)} kr</p>
            </div>
            <button onClick={() => addToOrder(menuItem)}>Add to Order</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
