// @flow

import React from 'react';
import Relay from 'react-relay';
import CreatePermissionMutation from '../../mutations/CreatePermissionMutation';
import DeletePermissionMutation from '../../mutations/DeletePermissionMutation';
import NewPermissionForm from './NewPermissionForm';
import PermissionList from './PermissionList';

type PermissionsComponentProps = {
  project: any,
  viewer: any,
  relay: {
    commitUpdate: () => void,
  },
};

class PermissionsComponent extends React.Component {
  state = {
    errors: [],
    isAddingPermission: false,
  };

  onPermissionCreate = (user) => {
    const onSuccess = (response) => {
      console.log('success', response);
      this.setState({ isAddingPermission: false });
    };

    const onFailure = (transaction) => {
      const error = transaction.getError();
      console.log(error.source);
      this.setState({ errors: error.source.errors.map(e => e.message) });
      console.error(error);
    };

    const mutation = new CreatePermissionMutation({
      project: this.props.project,
      user,
    });

    this.props.relay.commitUpdate(mutation, { onFailure, onSuccess });
  };

  onDelete = (permissionId: string) => {
    const onFailure = (transaction) => {
      const error = transaction.getError();
      console.log(error.source);
      this.setState({ errors: error.source.errors.map(e => e.message) });
      console.error(error);
    };

    const mutation = new DeletePermissionMutation({
      project: this.props.project,
      userId: permissionId,
      viewer: this.props.viewer,
    });

    this.props.relay.commitUpdate(mutation, { onFailure });
  };

  handleAddingCancel = () => {
    this.setState({ isAddingPermission: false });
  };

  props: PermissionsComponentProps;

  render() {
    const { project } = this.props;
    const permissions = project.users.edges.map(edge => edge.node);

    return (
      <section>
        <div className="title">
          <h6>Permissions</h6>
          <span className="actions">
            <button
              className="mdl-button mdl-js-button mdl-button--accent"
              onClick={() => this.setState({ isAddingPermission: true })}
            >
              Add permission
            </button>
          </span>
        </div>
        {this.state.isAddingPermission &&
          <NewPermissionForm
            onPermissionCreate={this.onPermissionCreate}
            handleCancel={this.handleAddingCancel}
            project={project}
            permissions={permissions}
            users={this.props.viewer.allUsers}
          />}
        <PermissionList permissions={permissions} onDelete={this.onDelete} />
      </section>
    );
  }
}

export default Relay.createContainer(PermissionsComponent, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id
        users(first: 10) {
          edges {
            node {
              id
              fullname
            }
          }
        }
      }
    `,
  },
});
