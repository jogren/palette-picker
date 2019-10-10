import React from 'react';
import Color from '../Color/Color';
import { connect } from 'react-redux';

const CurrentColors = ({ currentPalette }) => {
  let currentColors = currentPalette.map(color => {
    const style = {
      backgroundColor: color.hexCode
    }
    return <Color style={style} key={color.hexCode}/>
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