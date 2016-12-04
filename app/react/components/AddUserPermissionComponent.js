import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import Autocomplete from 'react-autocomplete'
import Autocomplete from './Autocomplete'
import { loadUsers, addPermission } from '../actions'
import Loading from './Loading'

const style = {
  highlighted: {
    cursor: 'default',
    padding: '6px 12px',
    color: 'white',
    background: 'rgb(63, 149, 191)'
  },
  item: {
    cursor: 'default',
    padding: '6px 12px'
  }
}

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      loading: false,
      users: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.props.loadUsers();
  }

  componentWillReceiveProps (nextProps) {
    let { users } = nextProps;
    this.setState({ users });
  }

  filterUsers (value, users, cb) {
    if (value === '') return cb();

    let items = users.filter(user => user.fullname.toLowerCase().indexOf(value.toLowerCase()) !== -1);

    setTimeout(() => {
      cb(items)
    }, 100);
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.addPermission(this.state.item.id, this.props.project.id);
    this.props.handleCancel();
  }

  render () {
    const { error, users } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="service-form">
        <div className="mdl-textfield mdl-js-textfield">
          <Autocomplete
            inputProps={{
              name: 'user names',
              id: 'permission-input'
            }}
            inputLabel={() => {
              return (
                <label className="mdl-textfield__label" htmlFor="permission-input">Name</label>
              )
            }}
            ref='autocomplete'
            value={this.state.value}
            items={this.state.users}
            getItemValue={(item) => item.fullname}
            onSelect={(value, item) => {
              // set the menu to only the selected item
              this.setState({ value, item, users: [ item ] })
            }}
            onChange={(event, value) => {
              this.setState({ value, loading: true })
              this.filterUsers(value, users, (items) => {
                if (!items) items = users;
                this.setState({ users: items, loading: false })
              })
            }}
            renderItem={(item, isHighlighted) => (
              <div
                style={isHighlighted ? style.highlighted : style.item}
                key={item.id}
                id={item.id}
              >{item.fullname}</div>
            )}
            wrapperStyle={{display: 'block'}}
          />
          {error && <span className="mdl-textfield__error" style={{visibility: 'visible'}}>{error}</span>}
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
    )
  }
}

FormComponent.propTypes = {
  error: PropTypes.string,
  loadUsers: PropTypes.func.isRequired,
  addPermission: PropTypes.func.isRequired,
  users: PropTypes.array
}

function mapStateToFormProps (state, ownProps) {
  const { error } = state.process.users;
  const { users } = state.entities;

  let usersArr = [];

  if (users) {
    Object.keys(users).forEach((key) => {
      let { id, email, fullname } = users[key];
      usersArr.push({ id, email, fullname });
    });
  }

  return { error, users: usersArr }
}

FormComponent = connect(mapStateToFormProps, {
  loadUsers, addPermission
})(FormComponent)

class AddUserPermissionComponent extends Component {
  render () {
    const { error, addService, handleCancel, project } = this.props;

    return (
      <div className='add'>
        {this.props.showInputs && (
          <FormComponent
            error={error}
            addService={addService}
            handleCancel={handleCancel}
            project={project}
          />
        )}
      </div>
    )
  }
}

AddUserPermissionComponent.propTypes = {
  error: PropTypes.string,
  handleCancel: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
}

function mapStateToProps (state, ownProps) {
  const { error } = state.process.projects;
  return { error }
}

export default connect(mapStateToProps, {

})(AddUserPermissionComponent)
