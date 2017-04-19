import React from 'react';
import Relay from 'react-relay';
import NewServiceForm from './NewServiceForm';
// import { loadServices, changeServiceActivation } from '../../actions';
import CreateServiceMutation from '../../mutations/CreateServiceMutation';
import List from './ServiceList';
import { ProjectPropType, ServicePropType } from '../../propTypes';

class ServicesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAddingService: false };
    this.handleAddingCancel = this.handleAddingCancel.bind(this);
    this.handleServiceActivationChange = this.handleServiceActivationChange.bind(this);
  }

  onServiceCreate = (name, type) => {
    const onSuccess = (response) => {
      console.log('success', response);
      this.setState({ name: '' });
    };

    const onFailure = (transaction) => {
      const error = transaction.getError();
      this.setState({ errors: error.source.errors.map(e => e.message) });
      console.error(error);
    };

    const mutation = new CreateServiceMutation(
      {
        projectId: '12234',
        name,
        type,
      },
    );

    this.props.relay.commitUpdate(
      mutation, { onFailure, onSuccess },
    );
  }

  handleAddingCancel() {
    this.setState({ isAddingService: false });
  }

  handleServiceActivationChange(service) {
    this.props.changeServiceActivation(service);
  }

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
        {this.state.isAddingService && (
          <NewServiceForm
            onServiceCreate={this.onServiceCreate}
            handleCancel={this.handleAddingCancel}
            project={project}
          />
        )}
        <List
          changeActivation={this.handleServiceActivationChange}
          services={project.services.edges}
          handleActivationChange={this.handleServiceActivationChange}
        />
      </section>
    );
  }
}

ServicesComponent.propTypes = {
  // services: React.PropTypes.arrayOf(ServicePropType).isRequired,
  // project: ProjectPropType,
};

ServicesComponent.defaultProps = {
  // services: [],
  isFetching: true,
  // project: {},
};

export default Relay.createContainer(ServicesComponent, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        services(first: 10) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
  },
});
