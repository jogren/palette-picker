export const getAllProjects = async () => {
  const url = 'https://palette-picker-api-sfjo.herokuapp.com/api/v1/projects';
  const response = await fetch(url);
  if (!response.ok) {
    throw Error('There was an issue getting your projects');
  }

  const projects = await response.json();
  return projects;
}

export const getSelectedPalettes = async (id) => {
  const url = `https://palette-picker-api-sfjo.herokuapp.com/api/v1/palettes?project_id=${id}`;
  const response = await fetch(url);
  const palettes = await response.json();
  if(!palettes.length) {
    return []
  } else if (!response.ok) {
    throw Error('There was an issue getting your palettes');
  }

  return palettes;
}

export const postNewProject = async (name) => {
  const url = 'https://palette-picker-api-sfjo.herokuapp.com/api/v1/projects';
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  }

  const response = await fetch(url, options);
  if(!response.ok) {
    throw Error('There was an issue posting your project');
  }

  const project = await response.json();
  return project;
}

export const postNewPalette = async (paletteObj) => {
  const url = 'https://palette-picker-api-sfjo.herokuapp.com/api/v1/palettes';
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paletteObj)
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw Error('There was an issue posting your palette');
  }

  const paletteId = await response.json();
  return paletteId;
}

export const deletePaletteFromDB = async (id) => {
  const url = `https://palette-picker-api-sfjo.herokuapp.com/api/v1/palettes/${id}`;
  try {
    const options = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error('There was an error deleting that palette');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export const deleteProjectFromDB = async (id) => {
  const url = `https://palette-picker-api-sfjo.herokuapp.com/api/v1/projects/${id}`;
  try {
    const options = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error('There was an error deleting that palette');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export const editPalette = async (paletteObj, id) => {
  const url = `https://palette-picker-api-sfjo.herokuapp.com/api/v1/palettes/${id}`;
  let options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paletteObj)
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw Error('There was an issue editing your palette');
  }

  const paletteId = await response.json();
  return paletteId;
}