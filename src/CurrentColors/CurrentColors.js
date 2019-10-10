import React from 'react';
import Color from '../Color/Color';
import { connect } from 'react-redux';
import { currentPalette } from '../reducers/currentPalette';


const CurrentColors = ({ currentPalette }) => {
  let currentColors = currentPalette.map(color => {
    const style = {
      backgroundColor: color
    }
    return <Color style={style} key={color}/>
  })
  return (
    <section className="current-colors">
      {currentColors}
    </section>
  )
}

const mapStateToProps = state => ({
  currentPalette: state.currentPalette
})

export default connect(mapStateToProps)(CurrentColors);