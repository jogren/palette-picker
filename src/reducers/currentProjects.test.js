import { currentProjects } from './currentProjects';

describe('currentProjects reducer', () => {
  it('should return the initial state', () => {
    const expected = [];

    const result = currentProjects(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return the new state with all of the projects when SET_PROJECTS action is passed through', () => {
    const expected = [
      {
        id: 3,
        name: 'Winter',
        created_at: '2019-10-10T19:13:08.873Z',
        updated_at: '2019-10-10T19:13:08.873Z'
      }
    ]
    const actionObj = {
      type: 'SET_PROJECTS',
      projects: [
        {
          id: 3,
          name: 'Winter',
          created_at: '2019-10-10T19:13:08.873Z',
          updated_at: '2019-10-10T19:13:08.873Z'
        }
      ]
    }

    const result = currentProjects(undefined, actionObj);

    expect(result).toEqual(expected);
  })
});