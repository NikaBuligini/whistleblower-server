import React from 'react';

type PermissionItemProps = {
  id: string,
  fullname: string,
  onDelete: (any) => void,
}

const PermissionItem = ({ id, fullname, onDelete }: PermissionItemProps) => (
  <li className="mdl-list__item">
    <span className="mdl-list__item-primary-content">
      <i className="material-icons mdl-list__item-icon">person</i>
      {fullname}
    </span>
    <span>
      <button
        className="mdl-button mdl-js-button mdl-button--icon"
        onClick={() => onDelete(id)}
      >
        <i className="material-icons">delete</i>
      </button>
    </span>
  </li>
);

export default PermissionItem;
