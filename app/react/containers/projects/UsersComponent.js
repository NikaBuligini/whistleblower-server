import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AddUserPermissionComponent from '../../components/AddUserPermissionComponent'
import { loadServices, changeServiceActivation } from '../../actions'
import Loading from '../../components/Loading'

class UserItem extends Component {
  render () {
    return (
      <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-icon">person</i>
          {this.props.permission.name}
        </span>
        <span>
          <button className="mdl-button mdl-js-button mdl-button--icon">
            <i className="material-icons">delete</i>
          </button>
        </span>
      </li>
    );
  }
}

class PermissionsList extends Component {
  render () {
    const { isFetching, permissions, handleActivationChange } = this.props;

    if (isFetching && typeof permissions !== 'undefined') {
      return <Loading cls='loading' />
    }

    if (Object.keys(permissions).length === 0) {
      return <span className='no-data'>No permissions</span>
    }

    return (
      <ul className="list mdl-list">
        {Object.keys(permissions).map((key, index) => {
          return (
            <UserItem
              key={index}
              permission={permissions[key]}
              handleActivationChange={handleActivationChange}
            />
          );
        })}
      </ul>
    );
  }
}

class UsersComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {isAddingPermission: false};
    this.handleAddingCancel = this.handleAddingCancel.bind(this);
    // this.handleServiceActivationChange = this.handleServiceActivationChange.bind(this);
  }

  handleAddingCancel () {
    this.setState({isAddingPermission: false});
  }

  render () {
    let { isFetching, services, project } = this.props;
    let tempPermissions = {
      0: {name: 'Nikoloz Buligini'},
      1: {name: 'Aleko Targamadze'},
      2: {name: 'Tengiz Lashkhi'}
    }

    return (
      <section>
        <div className='title'>
          <h6>Users</h6>
          <span className='actions'>
            <button
              className="mdl-button mdl-js-button mdl-button--accent"
              onClick={() => this.setState({isAddingPermission: true})}
            >
              Add permission
            </button>
          </span>
        </div>
        <AddUserPermissionComponent
          showInputs={this.state.isAddingPermission}
          handleCancel={this.handleAddingCancel}
          project={project}
        />
        <PermissionsList
          permissions={tempPermissions}
        />
      </section>
    );
  }
}

UsersComponent.propTypes = {
  services: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadServices: PropTypes.func.isRequired,
  changeServiceActivation: PropTypes.func.isRequired,
  project: PropTypes.object
}

UsersComponent.defaultProps = {
  isFetching: true
}

function mapStateToProps (state, ownProps) {
  const { isFetching } = state.process.services;
  let { services } = state.entities;

  let projectServices = {};
  Object.keys(services).forEach((key) => {
    let val = services[key];

    if (val.project === ownProps.project.name) {
      projectServices[key] = val;
    }
  });
  services = projectServices;

  return { isFetching, services };
}

export default connect(mapStateToProps, {
  loadServices, changeServiceActivation
})(UsersComponent)
