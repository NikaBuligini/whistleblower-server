import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import { Schemas } from './api';

function socketApi(schema, data) {
  const camelizedJson = camelizeKeys(data);
  return Object.assign({},
    normalize(camelizedJson, schema),
  );
}

/* eslint-disable no-unused-vars */
export default store => next => (action) => {
  const { socketAPI } = action;
  if (typeof socketAPI === 'undefined') {
    return next(action);
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction.socketAPI;
    delete finalAction.schema;
    return finalAction;
  }

  const { schema } = action;
  if (typeof schema !== 'string') {
    throw new Error('Specify a schema for socket payload.');
  }

  let payloadSchema = null;
  switch (schema) {
    case 'service':
      payloadSchema = Schemas.SERVICE;
      break;
    default:
      throw new Error(`'${schema}' is invalid schema type.`);
  }

  // const { type } = action;

  const response = socketApi(payloadSchema, socketAPI.payload);
  return next(actionWith({ response }));
};
