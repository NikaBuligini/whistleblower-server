import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import Autocomplete from 'react-autocomplete'
import Autocomplete from './Autocomplete'
import { loadUsers } from '../actions'
import Loading from './Loading'

const style = {
  highlited: {
    cursor: 'default',
    color: 'white',
    background: 'rgb(63, 149, 191)'
  },
  item: {
    cursor: 'default'
  }
}

function matchStateToTerm (state, value) {
  return (
    state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    state.abbr.toLowerCase().indexOf(value.toLowerCase()) !== -1
  )
}

function fakeRequest (value, cb) {
  if (value === '')
    return getStates()
  var items = getStates().filter((state) => {
    return matchStateToTerm(state, value)
  })
  setTimeout(() => {
    cb(items)
  }, 500)
}

function getStates() {
  return [
    { abbr: "AL", name: "Alabama"},
    { abbr: "AK", name: "Alaska"},
    { abbr: "AZ", name: "Arizona"},
  ]
}

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceName: '',
      value: '',
      unitedStates: getStates(),
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.props.loadUsers();
  }

  handleChange (event) {
    this.setState({serviceName: event.target.value});
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.addService(this.state.serviceName, this.props.project.id);
    this.props.handleCancel();
  }

  render () {
    const { error } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="service-form">
        <div className="mdl-textfield mdl-js-textfield">
          <Autocomplete
            inputProps={{
              name: 'user names',
              id: 'permission-input',
              // className: 'mdl-textfield__input'
            }}
            inputLabel={() => {
              return (
                <label className="mdl-textfield__label" htmlFor="permission-input" />
              )
            }}
            ref='autocomplete'
            value={this.state.value}
            items={this.props.users}
            getItemValue={(item) => item.fullname}
            onSelect={(value, item) => {
              // set the menu to only the selected item
              this.setState({ value, users: [ item ] })
              // or you could reset it to a default list again
              // this.setState({ unitedStates: getStates() })
            }}
            onChange={(event, value) => {
              this.setState({ value, loading: true })
              fakeRequest(value, (items) => {
                this.setState({ users: items, loading: false })
              })
            }}
            renderItem={(item, isHighlighted) => (
              <div
                style={isHighlighted ? style.highlited : style.item}
                key={item.id}
                id={item.id}
              >{item.fullname}</div>
            )}
            wrapperStyle={{display: 'block'}}
          />
          {/* <input
            className="mdl-textfield__input"
            type="text"
            id="service-name"
            autoComplete="off"
            autoFocus="on"
            onChange={this.handleChange}
            value={this.state.serviceName}
          />
          <label className="mdl-textfield__label" htmlFor="service-name">Name</label> */}
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
  loadUsers
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
