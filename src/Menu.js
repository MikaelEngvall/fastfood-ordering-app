import React from 'react';

const MenuItemCard = ({ menuItem, addToOrder }) => {
  const { id, name, price, image } = menuItem;

  return (
    <div className="menu-card" key={id}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{price.toFixed(2)} kr</p>
      <button onClick={() => addToOrder(menuItem)}>Add to Order</button>
    </div>
  );
};

const Menu = ({ menuItems, addToOrder }) => {
  return (
    <section className="menu">
      <h2>Menu</h2>
      <div className="menu-cards">
        {menuItems.map((menuItem) => (
          <MenuItemCard key={menuItem.id} menuItem={menuItem} addToOrder={addToOrder} />
        ))}
      </div>
    </section>
  );
};

export default Menu;
