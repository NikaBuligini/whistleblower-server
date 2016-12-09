import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import AddServiceComponent from './AddServiceComponent';
import { loadServices, changeServiceActivation } from '../../actions';
import List from './ServiceList';
import { ProjectPropType, ServicePropType } from '../../propTypes';

class ServicesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAddingService: false };
    this.handleAddingCancel = this.handleAddingCancel.bind(this);
    this.handleServiceActivationChange = this.handleServiceActivationChange.bind(this);
  }

  componentWillMount() {
    this.props.loadServices(this.props.project.id);
  }

  handleAddingCancel() {
    this.setState({ isAddingService: false });
  }

  handleServiceActivationChange(service) {
    this.props.changeServiceActivation(service);
  }

  render() {
    const { isFetching, services, project } = this.props;

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
        <AddServiceComponent
          showInputs={this.state.isAddingService}
          handleCancel={this.handleAddingCancel}
          project={project}
        />
        <List
          isFetching={isFetching}
          changeActivation={changeServiceActivation}
          services={services}
          handleActivationChange={this.handleServiceActivationChange}
        />
      </section>
    );
  }
}

ServicesComponent.propTypes = {
  services: React.PropTypes.arrayOf(ServicePropType).isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  loadServices: React.PropTypes.func.isRequired,
  changeServiceActivation: React.PropTypes.func.isRequired,
  project: ProjectPropType,
};

ServicesComponent.defaultProps = {
  services: [],
  isFetching: true,
};

function mapStateToProps(state, ownProps) {
  const { isFetching } = state.process.services;
  const services = _.values(ownProps.project.services)
    .map(key => state.entities.services[key])
    .filter(service => typeof service !== 'undefined');
  return { isFetching, services };
}

export default connect(mapStateToProps, {
  loadServices, changeServiceActivation,
})(ServicesComponent);
