// @flow

import React from 'react';
import Relay from 'react-relay';
import NewServiceForm from './NewServiceForm';
import CreateServiceMutation from '../../mutations/CreateServiceMutation';
import ChangeServiceStatusMutation
  from '../../mutations/ChangeServiceStatusMutation';
import ServiceList from './ServiceList';

type ServicesComponentProps = {
  project: any,
  viewer: any,
  relay: {
    commitUpdate: () => void,
  },
};

class ServicesComponent extends React.Component {
  state = {
    isAddingService: false,
  };

  state: {
    name: string,
    isAddingService: boolean,
    errors: Array<string>,
  }

  onServiceCreate = (name, type) => {
    const onSuccess = (response) => {
      console.log('success', response);
      this.setState({ name: '' });
    };

    const onFailure = (transaction) => {
      const error = transaction.getError();
      console.log(error.source);
      this.setState({ errors: error.source.errors.map(e => e.message) });
      console.error(error);
    };

    const mutation = new CreateServiceMutation({
      project: this.props.project,
      name,
      type,
      viewer: this.props.viewer,
    });

    this.props.relay.commitUpdate(mutation, { onFailure, onSuccess });
  };

  props: ServicesComponentProps;

  handleAddingCancel = () => {
    this.setState({ isAddingService: false });
  };

  handleServiceActivationChange = (service) => {
    console.log(service);

    const onFailure = (transaction) => {
      const error = transaction.getError();
      console.log(error.source);
      this.setState({ errors: error.source.errors.map(e => e.message) });
      console.error(error);
    };

    const mutation = new ChangeServiceStatusMutation({ service });

    this.props.relay.commitUpdate(mutation, { onFailure });
  };

  render() {
    const { project } = this.props;

    return (
      <section>
        <div className="title">
          <h6>Services</h6>
          <span className="actions">
            <button
              className="mdl-button mdl-js-button mdl-button--accent"
              onClick={() => this.setState({ isAddingService: true })}
            >
              New Service
            </button>
          </span>
        </div>
        {this.state.isAddingService &&
          <NewServiceForm
            onServiceCreate={this.onServiceCreate}
            handleCancel={this.handleAddingCancel}
            project={project}
          />}
        <ServiceList
          changeActivation={this.handleServiceActivationChange}
          services={project.services.edges.map(edge => edge.node)}
          handleActivationChange={this.handleServiceActivationChange}
        />
      </section>
    );
  }
}

export default Relay.createContainer(ServicesComponent, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id
        services(first: 10) {
          edges {
            node {
              id
              name
              isActive
            }
          }
        }
      }
    `,
  },
});
