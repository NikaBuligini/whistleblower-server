import { CALL_API, Schemas } from '../middleware/api'
import { SUBMIT_API } from '../middleware/submitApi'

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export function resetErrorMessage () {
  return {
    type: RESET_ERROR_MESSAGE
  };
}


export const PROJECTS_REQUEST = 'PROJECTS_REQUEST';
export const PROJECTS_SUCCESS = 'PROJECTS_SUCCESS';
export const PROJECTS_FAILURE = 'PROJECTS_FAILURE';

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchProjects (name) {
  if (typeof name === 'undefined') {
    return {
      [CALL_API]: {
        types: [ PROJECTS_REQUEST, PROJECTS_SUCCESS, PROJECTS_FAILURE ],
        endpoint: '/api/project',
        schema: Schemas.PROJECT_ARRAY
      },
      type: 'CALL_API'
    };
  }

  return {
    [CALL_API]: {
      types: [ PROJECTS_REQUEST, PROJECTS_SUCCESS, PROJECTS_FAILURE ],
      endpoint: `/api/project/${name}`,
      schema: Schemas.PROJECT
    },
    type: 'CALL_API'
  };
}

// Fetches a list of applocations from server unless it is cached.
// Relies on Redux Thunk middleware.
export function loadProjects () {
  return (dispatch, getState) => {
    return dispatch(fetchProjects());
  }
}

// Fetches a list of applocations from server unless it is cached.
// Relies on Redux Thunk middleware.
export function loadProject (name) {
  return (dispatch, getState) => {
    return dispatch(fetchProjects(name));
  }
}


export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';

// Calls single project creator method.
// Relies on the custom API middleware defined in ../middleware/submitApi.js.
function callCreateProject (name) {
  return {
    [SUBMIT_API]: {
      types: [ CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE ],
      endpoint: '/api/project',
      body: {
        projectName: name
      },
      method: 'PUT',
      schema: Schemas.PROJECT,
      success: fetchProjects(name)
    },
    type: 'SUBMIT_API'
  };
}

// Creates new project instance.
// Relies on Redux Thunk middleware.
export function createProject (name) {
  return (dispatch, getState) => {
    return dispatch(callCreateProject(name));
  }
}


export const SERVICES_REQUEST = 'SERVICES_REQUEST';
export const SERVICES_SUCCESS = 'SERVICES_SUCCESS';
export const SERVICES_FAILURE = 'SERVICES_FAILURE';

export const SERVICE_REQUEST = 'SERVICE_REQUEST';
export const SERVICE_SUCCESS = 'SERVICE_SUCCESS';
export const SERVICE_FAILURE = 'SERVICE_FAILURE';

// Fetches list of services for single project.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchServices (projectId) {
  return {
    [CALL_API]: {
      types: [ SERVICES_REQUEST, SERVICES_SUCCESS, SERVICES_FAILURE ],
      endpoint: `/api/service?projectId=${projectId}`,
      schema: Schemas.SERVICE_ARRAY
    },
    type: 'CALL_API'
  };
}

function fetchService (id) {
  return {
    [CALL_API]: {
      types: [ SERVICE_REQUEST, SERVICE_SUCCESS, SERVICE_FAILURE ],
      endpoint: `/api/service/${id}`,
      schema: Schemas.SERVICE
    },
    type: 'CALL_API'
  };
}

// Fetches a list of services for specific project from server.
// Relies on Redux Thunk middleware.
export function loadServices (projectId) {
  return (dispatch, getState) => {
    return dispatch(fetchServices(projectId));
  }
}


export const CREATE_SERVICE_REQUEST = 'CREATE_SERVICE_REQUEST';
export const CREATE_SERVICE_SUCCESS = 'CREATE_SERVICE_SUCCESS';
export const CREATE_SERVICE_FAILURE = 'CREATE_SERVICE_FAILURE';

// Calls single service creator method.
// Relies on the custom API middleware defined in ../middleware/submitApi.js.
function callCreateService (name, projectId) {
  return {
    [SUBMIT_API]: {
      types: [ CREATE_SERVICE_REQUEST, CREATE_SERVICE_SUCCESS, CREATE_SERVICE_FAILURE ],
      endpoint: `/api/service`,
      body: {
        projectId,
        name
      },
      method: 'PUT',
      schema: Schemas.SERVICE
    },
    type: 'SUBMIT_API'
  };
}

// Creates new service instance.
// Relies on Redux Thunk middleware.
export function addService (name, projectId) {
  return (dispatch, getState) => {
    return dispatch(callCreateService(name, projectId));
  }
}

export const CHANGE_SERVICE_ACTIVATION_REQUEST = 'CHANGE_SERVICE_ACTIVATION_REQUEST';
export const CHANGE_SERVICE_ACTIVATION_SUCCESS = 'CHANGE_SERVICE_ACTIVATION_SUCCESS';
export const CHANGE_SERVICE_ACTIVATION_FAILURE = 'CHANGE_SERVICE_ACTIVATION_FAILURE';


function callServiceActivationChange (service) {
  const { id, project, isActive } = service;

  return {
    [SUBMIT_API]: {
      types: [ CHANGE_SERVICE_ACTIVATION_REQUEST, CHANGE_SERVICE_ACTIVATION_SUCCESS, CHANGE_SERVICE_ACTIVATION_FAILURE ],
      endpoint: `/api/service/${id}/activate`,
      body: {
        serviceId: id,
        isActive: !isActive
      },
      success: fetchService(id)
    },
    type: 'SUBMIT_API'
  };
}

export function changeServiceActivation (service) {
  return (dispatch, getState) => {
    return dispatch(callServiceActivationChange(service));
  }
}
