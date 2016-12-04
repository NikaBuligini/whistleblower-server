import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

// This makes every API response have the same shape, regardless of how nested it was.
function submitApi (endpoint, body, method, schema) {
  return fetch(endpoint, {
    method: method || 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify(body)
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    const camelizedJson = camelizeKeys(json);

    return typeof schema !== 'undefined'
      ? Object.assign({}, normalize(camelizedJson, schema))
      : json;
  })
}

// Action key that carries API call info interpreted by this Redux middleware.
export const SUBMIT_API = Symbol('Submit API');

// A Redux middleware that interprets actions with SUBMIT_API info specified.
// Performs the call and promises when such actions are dispatched.
export default function (store, next, action) {
  const submitAPI = action[SUBMIT_API];
  if (typeof submitAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, body, method, schema } = submitAPI;
  const { types, success } = submitAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith (data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[SUBMIT_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }));

  return submitApi(endpoint, body, method, schema)
    .then(response => {
      next(actionWith({ response, type: successType }));
      if (typeof success === 'object') store.dispatch(success);
      else if (typeof success === 'function') success();
    }, error => {
      next(actionWith({
        type: failureType,
        error: error.message || 'Something bad happened'
      }));
    }
  );
}
