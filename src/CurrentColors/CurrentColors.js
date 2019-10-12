import React from 'react';
import Color from '../Color/Color';
import { connect } from 'react-redux';

const CurrentColors = ({ currentPalette, toggleLock }) => {
  let currentColors = currentPalette.map(color => {
    console.log(color)
    const colorStyle = { backgroundColor: color.hexCode };
    return <Color color={colorStyle} isLocked={color.isLocked} toggleLock={toggleLock} key={color.hexCode} />
  })

  return (
    <section className="current-colors">
      {currentColors}
    </section>
  );
}

const mapStateToProps = ({ currentPalette }) => ({
  currentPalette
})

export default connect(mapStateToProps)(CurrentColors);