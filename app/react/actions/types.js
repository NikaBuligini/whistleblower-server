// @flow

export type Action =
    { type: 'PROJECTS_REQUEST' }
  | { type: 'PROJECTS_SUCCESS', response: Object }
  | { type: 'PROJECTS_FAILURE', error: ?string }
  ;

export type Dispatch = (action: Action | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export type Service = {
  id: string,
  name: string,
  timeout: string,
  uuid: string,
  createdAt: string,
  updatedAt: string,
  status: string,
  type: string,
  isActive: boolean,
};

export type AddServiceForm = {
  name: string,
  type: string,
};

export type EditServiceForm = {
  name: string,
  type: string,
  timeout: number,
};

export type Project = {
  id: string,
  name: string,
  created_at: string,
  services: {
    edges: Array<{ node: Service }>,
  },
}
