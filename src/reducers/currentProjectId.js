export const currentProjectId = (state = "", action) => {
  switch (action.type) {
    case 'SET_PROJECT_ID':
      return action.id;
    default:
      return state;
  }
}