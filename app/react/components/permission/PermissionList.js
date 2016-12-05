import React from 'react';
import Loading from '../../components/Loading';
import PermissionItem from '../../components/permission/PermissionItem';

function PermissionList(props) {
  const { isFetching, permissions, handlePermissionDelete } = props;

  if (isFetching) {
    return <Loading cls="loading" />;
  }

  if (permissions.length === 0) {
    return <span className="no-data">No permissions</span>;
  }

  return (
    <ul className="list mdl-list">
      {permissions.map((permission, index) => (
        <PermissionItem
          key={index}
          permission={permission}
          handlePermissionDelete={handlePermissionDelete}
        />
      ))}
    </ul>
  );
}

PermissionList.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  permissions: React.PropTypes.array,
  handlePermissionDelete: React.PropTypes.func.isRequired,
};

export default PermissionList;
