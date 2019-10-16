import React from 'react';
import { connect } from 'react-redux';
import deleteIcon from '../images/delete.png';
import { FiTrash2 } from 'react-icons/fi';

export const SelectedPalettesContainer = ({ selectedPalettes, deletePalette, editPalette }) => {

  let selectedPalettesDisplay = selectedPalettes.map(palette => {
      return <div className="selected-palette" key={palette.name}>
        <header>
          <p>{palette.name}</p>
          <FiTrash2 className="trash-img" onClick={() => deletePalette(palette.id, palette.project_id)} src={deleteIcon} alt={palette.name}/>
        </header>
        <section className="color-container" onClick={() => editPalette(palette.id)}>
          <div style={{ backgroundColor: palette.color1 }}></div>
          <div style={{ backgroundColor: palette.color2 }}></div>
          <div style={{ backgroundColor: palette.color3 }}></div>
          <div style={{ backgroundColor: palette.color4 }}></div>
          <div style={{ backgroundColor: palette.color5 }}></div>
        </section>
      </div>
  })
  
  return (
    <section className="selectedPalettes_section">
      { selectedPalettesDisplay }
      {!selectedPalettes.length && <p className="no-selected-palettes">Please select a project or add some palettes</p> }
    </section>
  )
}

export const mapStateToProps = ({ selectedPalettes }) => ({
  selectedPalettes
});

export default connect(mapStateToProps)(SelectedPalettesContainer);