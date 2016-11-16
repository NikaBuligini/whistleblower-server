import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AddServiceComponent from '../../components/AddServiceComponent'
import { loadServices } from '../../actions'
import Loading from '../../components/Loading'

class ServiceItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isActive: props.service.is_active
    };

    this.handleActivationStatusChange = this.handleActivationStatusChange.bind(this);
  }

  handleActivationStatusChange (event) {
    console.log(event.target.value);
    this.setState({ isActive: event.target.value })
  }

  render () {
    const { service } = this.props;

    let switchId = `${service.name}-switch`;

    return (
      <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-icon">work</i>
          {service.name}
        </span>
        <span className="service-status">
          <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor={switchId}>
            <input
              id={switchId}
              type="checkbox"
              className="mdl-switch__input"
              checked={this.state.isActive}
              onChange={this.handleActivationStatusChange}
            />
          </label>
        </span>
      </li>
    );
  }
}

class ServicesList extends Component {
  componentDidUpdate () {
    componentHandler.upgradeDom();
  }

  render () {
    const { isFetching, services } = this.props;

    if (isFetching && typeof services !== 'undefined') {
      return <Loading cls='loading' />
    }

    if (Object.keys(services).length === 0) {
      return <span className='no-data'>No services</span>
    }

    return (
      <ul className="list mdl-list">
        {Object.keys(services).map((key, index) => {
          return (
            <ServiceItem
              key={index}
              service={services[key]}
            />
          );
        })}
      </ul>
    );
  }
}

class ServicesComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {isAddingService: false};
    this.handleAddingCancel = this.handleAddingCancel.bind(this);
  }

  componentWillMount () {
    this.props.loadServices(this.props.project.name);
  }

  handleAddingCancel () {
    this.setState({isAddingService: false});
  }

  render () {
    let { isFetching, services, project } = this.props;

    return (
      <section>
        <div className='title'>
          <h6>Services</h6>
          <span className='actions'>
            <button
              className="mdl-button mdl-js-button mdl-button--accent"
              onClick={() => this.setState({isAddingService: true})}
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
        <ServicesList
          isFetching={isFetching}
          services={services}
        />
      </section>
    );
  }
}

ServicesComponent.propTypes = {
  services: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadServices: PropTypes.func.isRequired,
  project: PropTypes.object
}

ServicesComponent.defaultProps = {
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
  loadServices
})(ServicesComponent)
