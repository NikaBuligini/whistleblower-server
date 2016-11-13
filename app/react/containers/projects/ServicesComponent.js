import React, { Component, PropTypes } from 'react'

class ServiceItem extends Component {
  render () {
    let switchId = `${this.props.name}-switch`;

    return (
      <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-icon">work</i>
          {this.props.name}
        </span>
        <span className="service-status">
          <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor={switchId}>
            <input type="checkbox" id={switchId} className="mdl-switch__input" />
          </label>
        </span>
      </li>
    );
  }
}

export default class ServicesComponent extends Component {
  render () {
    return (
      <section>
        <div className='title'>
          <h6>Services</h6>
          <span className='actions'>
            <button className="mdl-button mdl-js-button mdl-button--accent">
              New Service
            </button>
          </span>
        </div>
        <ul className="list mdl-list">
          <ServiceItem name='Disk space' />
          <ServiceItem name='CaseApplicationProcessor' />
          <ServiceItem name='WCF' />
        </ul>
      </section>
    );
  }
}
