import React from 'react';
import { FiLock, FiUnlock } from "react-icons/fi";


const Color = ({ color, isLocked, toggleLock }) => {
  let lockedImg = isLocked ? <FiLock /> : <FiUnlock />
  const upperCaseHex = color.backgroundColor.toUpperCase();
  return (
    <article className="color" style={color} onClick={() => toggleLock(color.backgroundColor)}>
      <button className="lock-btn">{lockedImg}</button>
      <p className="hex-name">{upperCaseHex}</p>
    </article>
  )
}

export default Color;