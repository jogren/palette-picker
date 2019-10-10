import React from 'react';

const Header = ({ generateColors }) => {
  return (
    <header>
      <h1>Palette Picker</h1>
      <button onClick={generateColors}>Generate New Palette</button>
    </header>
  )
}

export default Header;