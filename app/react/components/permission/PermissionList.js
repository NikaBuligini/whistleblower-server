import React from 'react';
import PermissionItem from '../../components/permission/PermissionItem';

type PermissionListProps = {
  permissions: Array<any>,
  onDelete: (any) => void,
}

function PermissionList({ permissions, onDelete }: PermissionListProps) {
  if (permissions.length === 0) {
    return <span className="no-data">No permissions</span>;
  }

  return (
    <ul className="list mdl-list">
      {permissions.map(permission => (
        <PermissionItem
          key={permission.id}
          {...permission}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default PermissionList;
