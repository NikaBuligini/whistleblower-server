import React from 'react';
import Relay from 'react-relay';
import Loading from '../Loading';
import Errors from '../../components/Errors';
import CreateProjectMutation from '../../containers/projects/CreateProjectMutation';

type NewProjectFormProps = {
  isAdding: boolean,
  viewer: any,
  relay: {
    commitUpdate: () => void,
  },
};

class NewProjectForm extends React.Component {
  state = {
    name: '',
    errors: [],
  }

  componentDidMount() {
    componentHandler.upgradeDom();
    // var notification = document.querySelector('.mdl-js-snackbar');
    // var data = {
    //   message: 'Message Sent',
    //   actionHandler (event) {},
    //   actionText: 'Undo',
    //   timeout: 10000
    // };
    // notification.MaterialSnackbar.showSnackbar(data);
  }

  props: NewProjectFormProps

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const onSuccess = (response) => {
      console.log('success', response);
      this.setState({ name: '' });
    };

    const onFailure = (transaction) => {
      const error = transaction.getError();
      this.setState({ errors: error.source.errors.map(e => e.message) });
      console.error(error);
    };

    const mutation = new CreateProjectMutation(
      {
        name: this.state.name,
        viewer: this.props.viewer,
      },
    );

    this.props.relay.commitUpdate(
      mutation, { onFailure, onSuccess },
    );
  }

  render() {
    const { isAdding } = this.props;
    const { errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Errors data={errors} />
        <div className="mdl-textfield mdl-js-textfield">
          <input
            className="mdl-textfield__input"
            type="text"
            id="project-name"
            autoComplete="off"
            autoFocus="on"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <label className="mdl-textfield__label" htmlFor="project-name">Name</label>
        </div>
        <button
          className="mdl-button mdl-js-button mdl-button--accent create"
          type="submit"
        >
          Create
        </button>
        {isAdding && <Loading cls="inline-loading" />}
      </form>
    );
  }
}

export default Relay.createContainer(NewProjectForm, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id
        name
        created_at
      }
    `,
  },
});
