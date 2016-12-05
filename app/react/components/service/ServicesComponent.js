import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AddServiceComponent from './AddServiceComponent';
import { loadServices, changeServiceActivation } from '../../actions';
import List from './ServiceList';

class ServicesComponent extends Component {
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
  services: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadServices: PropTypes.func.isRequired,
  changeServiceActivation: PropTypes.func.isRequired,
  project: PropTypes.object,
};

ServicesComponent.defaultProps = {
  isFetching: true,
};

function mapStateToProps(state, ownProps) {
  const { isFetching } = state.process.services;
  const services = ownProps.project.services
    .map(key => state.entities.services[key])
    .filter(service => typeof service !== 'undefined');

  return { isFetching, services };
}

export default connect(mapStateToProps, {
  loadServices, changeServiceActivation,
})(ServicesComponent);
