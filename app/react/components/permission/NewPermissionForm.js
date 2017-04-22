import React from 'react';
import _ from 'lodash';
import Autocomplete from '../Autocomplete';

type User = {
  id: string,
  fullname: string,
}

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

function filterUsers(value, users, cb) {
  if (value === '') return cb();

  const valueLowerCase = value.toLowerCase();
  const items = users.filter(user => user.fullname.toLowerCase().indexOf(valueLowerCase) !== -1);

  return setTimeout(() => {
    cb(items);
  }, 100);
}

function differentiate(all: Array<User> = [], actual: Array<User> = []) {
  return _.differenceWith(all, actual, o => o.id);
}

type NewPermissionFormProps = {
  permissions: Array<User>,
  users: Array<User>,
  onPermissionCreate: (string) => void,
  handleCancel: () => void,
}

class NewPermissionForm extends React.Component {
  state = {
    error: '',
    value: '',
    loading: false,
    users: differentiate(this.props.users, this.props.permissions),
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ users: differentiate(nextProps.users, nextProps.permissions) });
  }

  props: NewPermissionFormProps

  handleSubmit = (event) => {
    event.preventDefault();
    const { item } = this.state;

    if (item) {
      this.props.onPermissionCreate(item);
    } else {
      // this.setState({ error: 'Please, fill inputs' });
    }
  }

  render() {
    const { error, users } = this.state;

    return (
      <div className="add">
        <form onSubmit={this.handleSubmit} className="service-form">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
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
              onSelect={(value, item) => this.setState({ value, item, users: [item] })}
              onChange={(event, value) => {
                this.setState({ value, loading: true });
                filterUsers(value, users, (items) => {
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
      </div>
    );
  }
}

export default NewPermissionForm;
