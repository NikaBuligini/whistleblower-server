import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
// import Autocomplete from 'react-autocomplete';
import Autocomplete from '../Autocomplete';
import { loadUsers, addPermission } from '../../actions';
import { ProjectPropType, UserPropType } from '../../propTypes';

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

class NewPermissionForm extends React.Component {
  static filterUsers(value, users, cb) {
    if (value === '') return cb();

    const valueLowerCase = value.toLowerCase();
    const items = users.filter(user => user.fullname.toLowerCase().indexOf(valueLowerCase) !== -1);

    return setTimeout(() => {
      cb(items);
    }, 100);
  }

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      loading: false,
      users: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadUsers();
  }

  componentWillReceiveProps(nextProps) {
    const { users } = nextProps;
    this.setState({ users });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addPermission(this.state.item.id, this.props.project.id);
    this.props.handleCancel();
  }

  render() {
    const { error, users } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="service-form">
        <div className="mdl-textfield mdl-js-textfield">
          <Autocomplete
            inputProps={{
              name: 'user names',
              id: 'permission-input',
            }}
            inputLabel={() => (
              <label className="mdl-textfield__label" htmlFor="permission-input">
                Name
              </label>
            )}
            ref={(c) => {
              this.autocomplete = c;
            }}
            value={this.state.value}
            items={this.state.users}
            getItemValue={item => item.fullname}
            onSelect={(value, item) => {
              // set the menu to only the selected item
              this.setState({ value, item, users: [item] });
            }}
            onChange={(event, value) => {
              this.setState({ value, loading: true });
              this.filterUsers(value, users, (items) => {
                let userItems = items;
                if (!items) userItems = users;
                this.setState({ users: userItems, loading: false });
              });
            }}
            renderItem={(item, isHighlighted) => (
              <div
                style={isHighlighted ? style.highlighted : style.item}
                key={item.id}
                id={item.id}
              >{item.fullname}</div>
            )}
            wrapperStyle={{ display: 'block' }}
          />
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

NewPermissionForm.propTypes = {
  error: React.PropTypes.string,
  loadUsers: React.PropTypes.func.isRequired,
  addPermission: React.PropTypes.func.isRequired,
  handleCancel: React.PropTypes.func.isRequired,
  project: ProjectPropType.isRequired,
  users: React.PropTypes.arrayOf(UserPropType),
};

function mapStateToProps(state, ownProps) {
  const { error } = state.process.users;
  const allUsers = _.values(state.entities.users).map(user => user.id);
  const users = _.difference(allUsers, ownProps.project.users)
    .map(id => state.entities.users[id])
    .filter(user => typeof user !== 'undefined');

  return { error, users };
}

export default connect(mapStateToProps, {
  loadUsers, addPermission,
})(NewPermissionForm);
