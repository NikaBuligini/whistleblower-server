import React from 'react';
import { connect } from 'react-redux';
import { addService } from '../../actions';
import { ProjectPropType } from '../../propTypes';

const Input = (props) => {
  const { onChange, value, name, placeholder, className } = props;
  const cls = `mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${className}`;
  return (
    <div className={cls}>
      <input
        className="mdl-textfield__input"
        type="text"
        id={name}
        name={name}
        autoComplete="off"
        onChange={onChange}
        value={value}
      />
      <label className="mdl-textfield__label" htmlFor={name}>{placeholder}</label>
    </div>
  );
};

Input.propTypes = {
  name: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
  className: React.PropTypes.string,
};

class NewServiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      serviceName: '',
      serviceType: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.serviceName && this.state.serviceType) {
      this.props.addService(this.state.serviceName, this.state.serviceType, this.props.project.id);
    } else {
      // this.setState({ error: 'Please, fill inputs' });
    }
  }

  render() {
    // const { error } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="service-form">
        <Input
          className="first-block"
          placeholder="Name"
          onChange={this.handleChange}
          value={this.state.serviceName}
          name="serviceName"
        />
        <Input
          placeholder="Type"
          onChange={this.handleChange}
          value={this.state.serviceType}
          name="serviceType"
        />
        {/* {error && <span className="mdl-textfield__error" style={{ visibility: 'visible' }}>{error}</span>} */}
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
  project: ProjectPropType.isRequired,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {
  addService,
})(NewServiceForm);
