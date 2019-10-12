import React from 'react';
import { FaLockOpen } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';


const Color = ({ color, isLocked, toggleLock }) => {
  let lockedImg = isLocked ? <FaLock /> : <FaLockOpen />

  return (
    <article className="color" style={color}>
      <button onClick={() => toggleLock(color.backgroundColor)}>{lockedImg}</button>
      <p>{color.backgroundColor}</p>
    </article>
  )
}

export default Color;