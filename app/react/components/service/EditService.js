// @flow

import React from 'react';
import { connect } from 'react-redux';
import Input from '../Input';
import Autocomplete from '../Autocomplete';
import { updateService } from '../../actions';
import { ServicePropType } from '../../propTypes';
import type { Service, EditServiceForm } from '../../actions/types';

type Props = {
  service: Service,
  updateService: (form: EditServiceForm, projectId: string) => void,
};

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

class EditService extends React.Component {
  constructor(props: Props) {
    super(props);
    let timeout = props.service.timeout || '';
    if (typeof timeout !== 'string') timeout = timeout.toString();
    this.state = {
      name: props.service.name,
      type: props.service.type,
      timeout,
      types: serviceTypes,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state: {
    name: string,
    type: string,
    timeout: string,
    types: Object[],
    loading: boolean,
  };

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  filterTypes(value: string, types: Object[]) {
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

  handleChange: () => void;
  handleSubmit: () => void;
  filterTypes: () => void;
  autocomplete: Function;

  props: Props;

  handleChange(event: { target: { name: string, value: string} }): void {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    const { service } = this.props;
    const { name, type, timeout } = this.state;
    this.props.updateService({ name, type, timeout: parseInt(timeout, 10) }, service.id);
  }

  render() {
    const { types } = this.state;

    return (
      <section>
        <form onSubmit={this.handleSubmit} className="service-form">
          <Input
            className="block"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <Autocomplete
              inputProps={{ name: 'type', id: 'type' }}
              inputLabel={() => (
                <label className="mdl-textfield__label" htmlFor="permission-input">
                  Type
                </label>
              )}
              ref={(c) => { this.autocomplete = c; }}
              value={this.state.type}
              items={this.state.types}
              getItemValue={item => item.name}
              onSelect={(value: string, item: Object) => {
                // set the menu to only the selected item
                this.setState({ type: value, types: [item] });
              }}
              onChange={(event: Event, value: string) => {
                this.setState({ type: value, loading: true });
                this.filterTypes(value, types);
              }}
              renderItem={(item: Object, isHighlighted: boolean) => (
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
            className="block"
            type="number"
            name="timeout"
            placeholder="Timeout"
            value={this.state.timeout}
            onChange={this.handleChange}
          />
          <button
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
            type="submit"
          >
            Update
          </button>
        </form>
      </section>
    );
  }
}

EditService.propTypes = {
  service: ServicePropType,
  updateService: React.PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {
  updateService,
})(EditService);
