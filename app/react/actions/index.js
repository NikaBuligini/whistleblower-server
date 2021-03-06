// @flow

import _ from 'lodash';
import type { AddServiceForm, EditServiceForm } from './types';
import { CALL_API, Schemas } from '../middleware/api';
import { SUBMIT_API } from '../middleware/submitApi';

export const RESET_ERROR_MESSAGE: string = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export function resetErrorMessage(): { type: string } {
  return {
    type: RESET_ERROR_MESSAGE,
  };
}


export const PROJECTS_REQUEST: string = 'PROJECTS_REQUEST';
export const PROJECTS_SUCCESS: string = 'PROJECTS_SUCCESS';
export const PROJECTS_FAILURE: string = 'PROJECTS_FAILURE';

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchProjects(name: ?string) {
  if (typeof name === 'undefined') {
    return {
      [CALL_API]: {
        types: [PROJECTS_REQUEST, PROJECTS_SUCCESS, PROJECTS_FAILURE],
        endpoint: '/api/project',
        schema: Schemas.PROJECT_ARRAY,
      },
      type: 'CALL_API',
    };
  }

  return {
    [CALL_API]: {
      types: [PROJECTS_REQUEST, PROJECTS_SUCCESS, PROJECTS_FAILURE],
      endpoint: `/api/project/${name || ''}`,
      schema: Schemas.PROJECT,
    },
    type: 'CALL_API',
  };
}

// Fetches a list of applocations from server unless it is cached.
// Relies on Redux Thunk middleware.
export function loadProjects() {
  return (dispatch: Function) => dispatch(fetchProjects());
}

// Fetches a list of applocations from server unless it is cached.
// Relies on Redux Thunk middleware.
export function loadProject(name: string) {
  return (dispatch: Function) => dispatch(fetchProjects(name));
}


export const CREATE_PROJECT_REQUEST: string = 'CREATE_PROJECT_REQUEST';
export const CREATE_PROJECT_SUCCESS: string = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILURE: string = 'CREATE_PROJECT_FAILURE';

// Calls single project creator method.
// Relies on the custom API middleware defined in ../middleware/submitApi.js.
function callCreateProject(name: string) {
  return {
    [SUBMIT_API]: {
      types: [CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE],
      endpoint: '/api/project',
      body: {
        projectName: name,
      },
      method: 'PUT',
      schema: Schemas.PROJECT,
      success: fetchProjects(name),
    },
    type: 'SUBMIT_API',
  };
}

// Creates new project instance.
// Relies on Redux Thunk middleware.
export function createProject(name: string) {
  return (dispatch: Function) => dispatch(callCreateProject(name));
}


export const SERVICES_REQUEST: string = 'SERVICES_REQUEST';
export const SERVICES_SUCCESS: string = 'SERVICES_SUCCESS';
export const SERVICES_FAILURE: string = 'SERVICES_FAILURE';

export const SERVICE_REQUEST: string = 'SERVICE_REQUEST';
export const SERVICE_SUCCESS: string = 'SERVICE_SUCCESS';
export const SERVICE_FAILURE: string = 'SERVICE_FAILURE';

// Fetches list of services for single project.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchServices(projectId: string) {
  return {
    [CALL_API]: {
      types: [SERVICES_REQUEST, SERVICES_SUCCESS, SERVICES_FAILURE],
      endpoint: `/api/service?projectId=${projectId}`,
      schema: Schemas.SERVICE_ARRAY,
    },
    type: 'CALL_API',
  };
}

// Fetches a list of services for specific project from server.
// Relies on Redux Thunk middleware.
export function loadServices(projectId: string) {
  return (dispatch: Function) => dispatch(fetchServices(projectId));
}

function fetchService(id: string) {
  return {
    [CALL_API]: {
      types: [SERVICE_REQUEST, SERVICE_SUCCESS, SERVICE_FAILURE],
      endpoint: `/api/service/${id}`,
      schema: Schemas.SERVICE,
    },
    type: 'CALL_API',
  };
}

export function loadService(serviceId: string) {
  return (dispatch: Function) => dispatch(fetchService(serviceId));
}


export const CREATE_SERVICE_REQUEST: string = 'CREATE_SERVICE_REQUEST';
export const CREATE_SERVICE_SUCCESS: string = 'CREATE_SERVICE_SUCCESS';
export const CREATE_SERVICE_FAILURE: string = 'CREATE_SERVICE_FAILURE';

// Calls single service creator method.
// Relies on the custom API middleware defined in ../middleware/submitApi.js.
function callCreateService(newService: AddServiceForm, projectId: string) {
  const { name, type } = newService;
  return {
    [SUBMIT_API]: {
      types: [CREATE_SERVICE_REQUEST, CREATE_SERVICE_SUCCESS, CREATE_SERVICE_FAILURE],
      endpoint: '/api/service',
      body: {
        projectId,
        name,
        type,
      },
      method: 'PUT',
      schema: Schemas.SERVICE,
      success: (store, response) => {
        const newServiceId = Object.keys(response.entities.services)[0];

        const project = _.cloneDeep(store.getState().entities.projects[projectId]);
        project.services.push(newServiceId);

        store.dispatch({
          type: PROJECTS_SUCCESS,
          response: {
            entities: {
              projects: { [projectId]: project },
            },
          },
        });
      },
    },
    type: 'SUBMIT_API',
  };
}

// Creates new service instance.
// Relies on Redux Thunk middleware.
export function addService(newService: AddServiceForm, projectId: string) {
  return (dispatch: Function) => dispatch(callCreateService(newService, projectId));
}


export const UPDATE_SERVICE_REQUEST: string = 'UPDATE_SERVICE_REQUEST';
export const UPDATE_SERVICE_SUCCESS: string = 'UPDATE_SERVICE_SUCCESS';
export const UPDATE_SERVICE_FAILURE: string = 'UPDATE_SERVICE_FAILURE';

// Calls single service updater method.
// Relies on the custom API middleware defined in ../middleware/submitApi.js.
function callUpdateService(newService: EditServiceForm, serviceId: string) {
  const { name, type, timeout } = newService;
  return {
    [SUBMIT_API]: {
      types: [UPDATE_SERVICE_REQUEST, UPDATE_SERVICE_SUCCESS, UPDATE_SERVICE_FAILURE],
      endpoint: `/api/service/${serviceId}/store`,
      body: {
        name,
        type,
        timeout,
      },
      method: 'PUT',
      schema: Schemas.SERVICE,
    },
    type: 'SUBMIT_API',
  };
}

// Updates new service instance.
// Relies on Redux Thunk middleware.
export function updateService(newService: EditServiceForm, serviceId: string) {
  return (dispatch: Function) => dispatch(callUpdateService(newService, serviceId));
}

export const CHANGE_SERVICE_ACTIVATION_REQUEST: string = 'CHANGE_SERVICE_ACTIVATION_REQUEST';
export const CHANGE_SERVICE_ACTIVATION_SUCCESS: string = 'CHANGE_SERVICE_ACTIVATION_SUCCESS';
export const CHANGE_SERVICE_ACTIVATION_FAILURE: string = 'CHANGE_SERVICE_ACTIVATION_FAILURE';


function callServiceActivationChange(service: {id: string, isActive: boolean}) {
  const { id, isActive } = service;

  return {
    [SUBMIT_API]: {
      types: [CHANGE_SERVICE_ACTIVATION_REQUEST, CHANGE_SERVICE_ACTIVATION_SUCCESS,
        CHANGE_SERVICE_ACTIVATION_FAILURE],
      endpoint: `/api/service/${id}/activate`,
      body: {
        serviceId: id,
        isActive: !isActive,
      },
      method: 'POST',
      schema: Schemas.SERVICE,
    },
    type: 'SUBMIT_API',
  };
}

export function changeServiceActivation(service: {id: string, isActive: boolean}) {
  return (dispatch: Function) => dispatch(callServiceActivationChange(service));
}


export const USERS_REQUEST: string = 'USERS_REQUEST';
export const USERS_SUCCESS: string = 'USERS_SUCCESS';
export const USERS_FAILURE: string = 'USERS_FAILURE';

// Fetches list of users.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchUsers() {
  return {
    [CALL_API]: {
      types: [USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE],
      endpoint: '/api/user',
      schema: Schemas.USER_ARRAY,
    },
    type: 'CALL_API',
  };
}

// Fetches a list of users.
// Relies on Redux Thunk middleware.
export function loadUsers() {
  return (dispatch: Function) => dispatch(fetchUsers());
}


export const CREATE_PERMISSION_REQUEST: string = 'CREATE_PERMISSION_REQUEST';
export const CREATE_PERMISSION_SUCCESS: string = 'CREATE_PERMISSION_SUCCESS';
export const CREATE_PERMISSION_FAILURE: string = 'CREATE_PERMISSION_FAILURE';

// Calls single permission creator method.
// Relies on the custom API middleware defined in ../middleware/submitApi.js.
function callCreatePermission(userId: string, projectId: string) {
  return {
    [SUBMIT_API]: {
      types: [CREATE_PERMISSION_REQUEST, CREATE_PERMISSION_SUCCESS, CREATE_PERMISSION_FAILURE],
      endpoint: `/api/project/${projectId}/permission`,
      body: {
        userId,
      },
      method: 'PUT',
      schema: Schemas.PROJECT,
    },
    type: 'SUBMIT_API',
  };
}

// Gives user permission over project
// Relies on Redux Thunk middleware.
export function addPermission(userId: string, projectId: string) {
  return (dispatch: Function) => dispatch(callCreatePermission(userId, projectId));
}

export const REMOVE_PERMISSION_REQUEST: string = 'REMOVE_PERMISSION_REQUEST';
export const REMOVE_PERMISSION_SUCCESS: string = 'REMOVE_PERMISSION_SUCCESS';
export const REMOVE_PERMISSION_FAILURE: string = 'REMOVE_PERMISSION_FAILURE';

// Calls single permission creator method.
// Relies on the custom API middleware defined in ../middleware/submitApi.js.
function callRemovePermission(userId: string, projectId: string) {
  return {
    [SUBMIT_API]: {
      types: [REMOVE_PERMISSION_REQUEST, REMOVE_PERMISSION_SUCCESS, REMOVE_PERMISSION_FAILURE],
      endpoint: `/api/project/${projectId}/permission`,
      body: {
        userId,
      },
      method: 'DELETE',
      schema: Schemas.PROJECT,
      success: () => {
        location.reload();
      },
    },
    type: 'SUBMIT_API',
  };
}

// Gives user permission over project
// Relies on Redux Thunk middleware.
export function removePermission(userId: string, projectId: string) {
  return (dispatch: Function) => dispatch(callRemovePermission(userId, projectId));
}


// Fetches a projects for authorized user.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchMyProjects() {
  return {
    [CALL_API]: {
      types: [PROJECTS_REQUEST, PROJECTS_SUCCESS, PROJECTS_FAILURE],
      endpoint: '/api/me/project',
      schema: Schemas.PROJECT_ARRAY,
    },
    type: 'CALL_API',
  };
}

export function loadUserServices() {
  return (dispatch: Function) => dispatch(fetchMyProjects());
}
