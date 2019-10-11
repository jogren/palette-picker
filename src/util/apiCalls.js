export const getAllProjects = async () => {
  const url = 'https://palette-picker-api-sfjo.herokuapp.com/api/v1/projects';
  const response = await fetch(url);
  if (!response.ok) {
    throw Error('There was an issue getting your projects');
  }

  const projects = await response.json();
  return projects;
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