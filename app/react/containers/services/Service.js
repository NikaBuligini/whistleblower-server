import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DocumentTitle from 'react-document-title';
import { loadService } from '../../actions';
import Loading from '../../components/Loading';
import EditService from '../../components/service/EditService';
import { ServicePropType } from '../../propTypes';

const ProjectDetails = (props) => {
  const { service } = props;
  const createdAt = new Date(service.createdAt);
  return (
    <section style={{ padding: '12px 0' }}>
      <div>
        <span>{`Created at: ${createdAt.toLocaleDateString()}`}</span>
      </div>
      <div>
        <span>{`Key: ${service.uuid}`}</span>
      </div>
    </section>
  );
};

ProjectDetails.propTypes = {
  service: ServicePropType.isRequired,
};

class Service extends React.Component {
  componentWillMount() {
    this.props.loadService(this.props.params.serviceId);
  }

  render() {
    const { isFetching, service } = this.props;

    if (isFetching || typeof service === 'undefined') {
      return <Loading />;
    }

    return (
      <DocumentTitle title={service.name}>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset">
            <section
              className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--4dp service-detailed"
            >
              <div className="mdl-card__title">
                <h2 className="mdl-card__title-text">
                  {service.name}
                </h2>
              </div>
              <div className="mdl-card__supporting-text">
                <ProjectDetails service={service} />
                <EditService service={service} />
              </div>
            </section>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

Service.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  loadService: React.PropTypes.func.isRequired,
  service: ServicePropType,
  params: React.PropTypes.shape({
    serviceId: React.PropTypes.string.isRequired,
    projectName: React.PropTypes.string,
  }).isRequired,
};

Service.defaultProps = {
  isFetching: true,
  service: {},
};

function mapStateToProps(state, ownProps) {
  const { isFetching } = state.process.services;

  const service = state.entities.services[ownProps.params.serviceId];

  return { isFetching, service };
}

export default withRouter(connect(mapStateToProps, {
  loadService,
})(Service));
