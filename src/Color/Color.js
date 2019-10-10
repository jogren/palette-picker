import React from 'react';

const Color = ({ color, toggleLock }) => {
  return (
    <article className="color" style={color}>
      <button onClick={() => toggleLock(color.backgroundColor)}>lock</button>
      <p>{color.backgroundColor}</p>
    </article>
  )
}

export default Color;