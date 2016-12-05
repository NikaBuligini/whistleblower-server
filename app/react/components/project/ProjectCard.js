import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import moment from 'moment';

class ProjectCard extends Component {
  goToLink(url) {
    this.props.router.push(url);
  }

  render() {
    const { project } = this.props;
    project.createdAt = new Date(project.createdAt);

    const editUrl = `/projects/${project.name}`;

    return (
      <div className="item mdl-card mdl-shadow--4dp">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">
            <Link to={editUrl} className="name">
              {project.name}
            </Link>
          </h2>
        </div>
        <div className="mdl-card__supporting-text">
          <span>Services: {project.services.length}, Secret: {project.uuid}</span>
        </div>
        <div className="mdl-card__actions">
          <a href="(URL or function)">Services</a>
        </div>
        <div className="mdl-card-actions">
          <span
            title={project.createdAt.toLocaleDateString()}
            className="default timespan"
          >
            {moment(project.createdAt).fromNow()}
          </span>

          <button
            id={`${project.name}-actions`}
            className="mdl-button mdl-js-button mdl-button--icon hover"
          >
            <i className="material-icons">more_vert</i>
          </button>

          <ul
            className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
            htmlFor={`${project.name}-actions`}
          >
            <li
              className="mdl-menu__item"
              // onClick={this.goToLink.bind(this, editUrl)}
            >
              View
            </li>
            <li disabled className="mdl-menu__item">Edit</li>
          </ul>
        </div>
      </div>
    );
  }
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  router: PropTypes.any,
};

export default withRouter(ProjectCard);
