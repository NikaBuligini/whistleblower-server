import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

function preloaded (state = {}, action) {
  return state
}

function apps (state = {
  isFetching: false,
  error: null
}, action) {
  switch (action.type) {
    case ActionTypes.APPS_REQUEST:
      return merge({}, state, {
        isFetching: true
      })
    case ActionTypes.APPS_SUCCESS:
      return merge({}, state, {
        isFetching: false
      })
    case ActionTypes.APPS_FAILURE:
      return merge({}, state, {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}

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
  apps,
  errorMessage,
  routing
})

export default rootReducer
