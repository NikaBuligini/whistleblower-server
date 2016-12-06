import { PropTypes } from 'react';

const ProjectPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  uuid: PropTypes.string,
  createdAt: PropTypes.date,
  updatedAt: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.string),
  services: PropTypes.arrayOf(PropTypes.string),
});

const ServicePropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  uuid: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  status: PropTypes.string,
  type: PropTypes.string,
  isActive: PropTypes.bool,
});

const UserPropType = PropTypes.shape({
  id: PropTypes.string,
  fullname: PropTypes.string,
  email: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.string),
});

const StorePropType = PropTypes.object;
const HistoryPropType = PropTypes.object;

export {
  ProjectPropType,
  ServicePropType,
  UserPropType,
  StorePropType,
  HistoryPropType,
};
