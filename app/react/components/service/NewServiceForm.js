import React from 'react';
import { connect } from 'react-redux';
import { addService } from '../../actions';

class NewServiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { serviceName: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addService(this.state.serviceName, this.props.project.id);
    this.props.handleCancel();
  }

  render() {
    const { error } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="service-form">
        <div className="mdl-textfield mdl-js-textfield">
          <input
            className="mdl-textfield__input"
            type="text"
            id="service-name"
            autoComplete="off"
            autoFocus="on"
            onChange={(event) => {
              this.setState({ serviceName: event.target.value });
            }}
            value={this.state.serviceName}
          />
          <label className="mdl-textfield__label" htmlFor="service-name">Name</label>
          {error && <span className="mdl-textfield__error" style={{ visibility: 'visible' }}>{error}</span>}
        </div>
        <button
          className="mdl-button mdl-js-button mdl-button--accent add-service"
          type="submit"
        >
          Add
        </button>
        <button
          className="mdl-button mdl-js-button mdl-button--primary cancel"
          type="button"
          onClick={this.props.handleCancel}
        >
          Cancel
        </button>
      </form>
    );
  }
}

NewServiceForm.propTypes = {
  addService: React.PropTypes.func.isRequired,
  handleCancel: React.PropTypes.func.isRequired,
  project: React.PropTypes.object.isRequired,
  error: React.PropTypes.string,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {
  addService,
})(NewServiceForm);
