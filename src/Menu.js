import React from 'react';

const Menu = ({ menuItems, addToOrder }) => {
  return (
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
          {menuItems.map((menuItem) => (
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
  );
};

export default Menu;
