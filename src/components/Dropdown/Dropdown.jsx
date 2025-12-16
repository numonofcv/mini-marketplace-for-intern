import React from 'react';
import './Dropdown.css';

const Dropdown = ({ scrollToId, isMobileOpen }) => {
  return (
    <ul className={`dropdown-menu ${isMobileOpen ? 'open' : ''}`}>
      <li className="dropdown-item">
        <a href="/#products" onClick={scrollToId}>Barcha Mahsulotlar</a>
      </li>
      <li className="dropdown-item">
        <a href="/#trending" onClick={scrollToId}>Trenddagi Gadgetlar</a>
      </li>
    </ul>
  );
};

export default Dropdown;
