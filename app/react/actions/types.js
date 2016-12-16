// @flow

export type Action =
    { type: 'PROJECTS_REQUEST' }
  | { type: 'PROJECTS_SUCCESS', response: Object }
  | { type: 'PROJECTS_FAILURE', error: ?string }
  ;

export type Dispatch = (action: Action | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
