import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ServicesComponent from './ServicesComponent'
import UsersComponent from './UsersComponent'

class Project extends Component {
  render () {
    return (
      <div className='mdl-grid'>
        <div className='mdl-cell mdl-cell--8-col mdl-cell--2-offset'>
          <section className='section--center mdl-grid mdl-grid--no-spacing mdl-shadow--4dp project-detailed'>
            <div className='mdl-card__title'>
              <h2 className='mdl-card__title-text'>
                {this.props.params.projectName}
              </h2>
            </div>
            <div className='mdl-card__supporting-text'>
              <ServicesComponent />
              <UsersComponent />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {};
}

export default connect(mapStateToProps, {

})(Project)
