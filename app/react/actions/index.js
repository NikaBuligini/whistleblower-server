import { CALL_API, Schemas } from '../middleware/api'

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage () {
  return {
    type: RESET_ERROR_MESSAGE
  }
}


export const PROJECTS_REQUEST = 'PROJECTS_REQUEST'
export const PROJECTS_SUCCESS = 'PROJECTS_SUCCESS'
export const PROJECTS_FAILURE = 'PROJECTS_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchProjects () {
  return {
    [CALL_API]: {
      types: [ PROJECTS_REQUEST, PROJECTS_SUCCESS, PROJECTS_FAILURE ],
      endpoint: '/api/projects',
      schema: Schemas.PROJECT_ARRAY
    },
    type: 'CALL_API'
  }
}

// Fetches a list of applocations from server unless it is cached.
// Relies on Redux Thunk middleware.
export function loadProjects () {
  return (dispatch, getState) => {
    const { projects } = getState().entities

    if (Object.keys(projects).length !== 0) {
      return null
    }

    return dispatch(fetchProjects())
  }
}
