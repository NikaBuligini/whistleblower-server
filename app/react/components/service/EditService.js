// @flow

import React from 'react';
import Input from '../Input';
import { ServicePropType } from '../../propTypes';

type Props = {
  service: { name: string, type: string },
};

class EditService extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: props.service.name,
      type: props.service.type,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state: {
    name: string,
    type: string,
  };

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  handleChange: () => void;
  handleSubmit: () => void;

  props: Props;

  handleChange(event: { target: { name: string, value: string} }): void {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    console.log(this.state);
    //
  }

  render() {
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
          <Input
            className="block"
            name="type"
            placeholder="Type"
            value={this.state.type}
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
};

export default EditService;
