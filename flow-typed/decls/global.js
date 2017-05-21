// @flow

declare var componentHandler: {
  upgradeDom(): void,
};

declare type Edge<T> = {
  node: T,
};

declare type Edges<T> = {
  edges: Array<Edge<T>>,
};

declare type Router = {
  goBack: () => void,
  push: (string) => void,
  replace: (string) => void,
};
