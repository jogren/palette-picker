import React from 'react';
import Color from '../Color/Color';

const CurrentColors = ({colors}) => {
  let currentColors = colors.map(color => {
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

export default CurrentColors;