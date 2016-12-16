import React from 'react';
import { connect } from 'react-redux';
import Autocomplete from '../Autocomplete';
import { addService } from '../../actions';
import { ProjectPropType } from '../../propTypes';

const style = {
  highlighted: {
    cursor: 'default',
    padding: '6px 12px',
    color: 'white',
    background: 'rgb(63, 149, 191)',
  },
  item: {
    cursor: 'default',
    padding: '6px 12px',
  },
};

const serviceTypes = [
  {
    id: 0,
    name: 'Disk usage',
  },
];

const Input = (props) => {
  const { onChange, value, name, placeholder, className, type } = props;
  const cls = `mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${className}`;
  return (
    <div className={cls}>
      <input
        className="mdl-textfield__input"
        type={type || 'text'}
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
  type: React.PropTypes.string,
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
      serviceTimeout: '',
      loading: false,
      types: serviceTypes,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  filterTypes(value, types) {
    if (value === '') {
      this.setState({ types, loading: false });
      return;
    }

    const valueLowerCase = value.toLowerCase();
    const items = types.filter(user => user.name.toLowerCase().indexOf(valueLowerCase) !== -1);

    setTimeout(() => {
      let typeItems = items;
      if (!items) typeItems = types;
      this.setState({ types: typeItems, loading: false });
    }, 100);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.serviceName && this.state.serviceType) {
      const { serviceName, serviceType, serviceTimeout } = this.state;
      const formData = {
        name: serviceName,
        type: serviceType,
        timeout: serviceTimeout,
      };
      this.props.addService(formData, this.props.project.id);
    } else {
      // this.setState({ error: 'Please, fill inputs' });
    }
  }

  render() {
    const { types } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="service-form">
        <Input
          className="first-block"
          placeholder="Name"
          onChange={this.handleChange}
          value={this.state.serviceName}
          name="serviceName"
        />
        <div className="mdl-textfield mdl-js-textfield">
          <Autocomplete
            inputProps={{
              name: 'service types',
              id: 'serviceType',
            }}
            inputLabel={() => (
              <label className="mdl-textfield__label" htmlFor="permission-input">
                Type
              </label>
            )}
            ref={(c) => {
              this.autocomplete = c;
            }}
            value={this.state.serviceType}
            items={this.state.types}
            getItemValue={item => item.name}
            onSelect={(value, item) => {
              // set the menu to only the selected item
              this.setState({ serviceType: value, item, types: [item] });
            }}
            onChange={(event, value) => {
              this.setState({ serviceType: value, loading: true });
              this.filterTypes(value, types);
            }}
            renderItem={(item, isHighlighted) => (
              <div
                style={isHighlighted ? style.highlighted : style.item}
                key={item.id}
                id={item.id}
              >{item.name}</div>
            )}
            wrapperStyle={{ display: 'block' }}
          />
        </div>
        <Input
          className="first-block"
          placeholder="Timeout"
          type="number"
          onChange={this.handleChange}
          value={this.state.serviceTimeout}
          name="serviceTimeout"
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
