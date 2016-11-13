import React, { Component, PropTypes } from 'react'

class UserItem extends Component {
  render () {
    return (
      <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-icon">person</i>
          {this.props.name}
        </span>
        <span>
          <button className="mdl-button mdl-js-button mdl-button--icon">
            <i className="material-icons">delete</i>
          </button>
        </span>
      </li>
    );
  }
}

export default class UsersComponent extends Component {
  render () {
    return (
      <section>
        <div className='title'>
          <h6>Users</h6>
          <span className='actions'>
            <button className="mdl-button mdl-js-button mdl-button--accent">
              Add permission
            </button>
          </span>
        </div>
        <ul className="list mdl-list">
          <UserItem name='Nikoloz Buligini' />
          <UserItem name='Aleko Targamadze' />
          <UserItem name='Tengiz Lashkhi' />
        </ul>
      </section>
    );
  }
}
