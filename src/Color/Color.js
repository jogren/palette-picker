import React from 'react';

const Color = ({ color, toggleLock }) => {
  return (
    <article className="color" style={color}>
      <button onClick={() => toggleLock(color.backgroundColor)}>lock</button>
    </article>
  )
}

export default Color;