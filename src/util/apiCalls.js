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
  console.log(project);
  return project;
}