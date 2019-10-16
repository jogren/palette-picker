import React from 'react';

const Header = ({ generateColors, lockMessage }) => {
  return (
    <header className="Header_header">
      <h1>Palette Picker</h1>
      {lockMessage && <p>Click on a color to lock...</p>}
      <button className="generate-color-btn" onClick={generateColors}>Generate New Palette</button>
    </header>
  )
}

export default Header;