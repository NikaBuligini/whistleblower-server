import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

function preloaded (state = {}, action) {
  return state
}

function memory (state = {
  available: '0',
  free: '0',
  total: '0'
}, action) {
  switch (action.type) {
    case 'MEMORY_UPDATE':
      let { available, free, total } = action.info
      return { available, free, total }
      break;
    default:
      return state;
  }
}

// Updates an entity cache in response to any action with response.entities.
function entities (state = { projects: {}, services: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

function projects (state = {
  isFetching: false,
  error: null
}, action) {
  switch (action.type) {
    case ActionTypes.PROJECTS_REQUEST:
      return merge({}, state, {
        isFetching: true
      })
    case ActionTypes.PROJECTS_SUCCESS:
      return merge({}, state, {
        isFetching: false
      })
    case ActionTypes.PROJECTS_FAILURE:
      return merge({}, state, {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}

const process = combineReducers({
  projects
})

// Updates error message to notify about the failed fetches.
function errorMessage (state = null, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

const rootReducer = combineReducers({
  preloaded,
  process,
  memory,
  entities,
  errorMessage,
  routing
})

export default rootReducer
