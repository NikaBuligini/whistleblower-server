import React from 'react';
import Autocomplete from '../Autocomplete';
import Input from '../Input';

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

type NewServiceFormProps = {
  onServiceCreate: (string, string) => void,
  handleCancel: () => void,
}

class NewServiceForm extends React.Component {
  state = {
    error: '',
    serviceName: '',
    serviceType: '',
    loading: false,
    types: serviceTypes,
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  props: NewServiceFormProps

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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { serviceName, serviceType } = this.state;

    if (serviceName && serviceType) {
      this.props.onServiceCreate(serviceName, serviceType);
    } else {
      // this.setState({ error: 'Please, fill inputs' });
    }
  }

  render() {
    const { types } = this.state;

    return (
      <div className="add">
        <form onSubmit={this.handleSubmit} className="service-form">
          <Input
            className="first-block"
            placeholder="Name"
            onChange={this.handleChange}
            value={this.state.serviceName}
            name="serviceName"
          />
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
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
      </div>
    );
  }
}

export default NewServiceForm;
