import React from 'react';
import { UserPropType } from '../../propTypes';

function PermissionItem(props) {
  const { permission } = props;

  return (
    <li className="mdl-list__item">
      <span className="mdl-list__item-primary-content">
        <i className="material-icons mdl-list__item-icon">person</i>
        {permission.fullname}
      </span>
      <span>
        <button
          className="mdl-button mdl-js-button mdl-button--icon"
          onClick={() => {
            props.handlePermissionDelete(permission);
          }}
        >
          <i className="material-icons">delete</i>
        </button>
      </span>
    </li>
  );
}

PermissionItem.propTypes = {
  permission: UserPropType.isRequired,
  handlePermissionDelete: React.PropTypes.func.isRequired,
};

export default PermissionItem;
