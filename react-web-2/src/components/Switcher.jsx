import React, { useState } from "react";
import './Switcher.css';

function Switcher({ text }) {
  const [toggle, setToggle] = useState(false);

  const toggler = () => {
    setToggle(!toggle);
  }

  return (
    <div className={`switcher ${toggle ? 'selected' : ''}`}>
      <div className="texto">
        <p>{text}</p>
      </div>
      <div className="checker">
        <input type="checkbox" id="switcher" onClick={toggler} />
        <label htmlFor="switcher"></label>
      </div>
    </div>
  );
}

export default Switcher;
