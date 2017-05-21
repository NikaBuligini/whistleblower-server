// @flow

import React from 'react';
import { Link, withRouter } from 'react-router';
import moment from 'moment';
import { ProjectPropType } from '../../propTypes';
import type { Project } from '../../actions/types';

class ProjectCard extends React.Component {
  props: {
    project: Project,
    router: Router,
  };

  goToLink(url) {
    this.props.router.push(url);
  }

  render() {
    const { project } = this.props;
    const createdAt = moment(project.created_at);

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
        {/* <div className="mdl-card__supporting-text">
          <span>Services: {project.services.length}, Secret: {project.uuid}</span>
        </div> */}
        <div className="mdl-card__actions">
          <a href="(URL or function)">Services</a>
        </div>
        <div className="mdl-card-actions">
          <span title={createdAt.format('L')} className="default timespan">
            {createdAt.fromNow()}
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
            <li className="mdl-menu__item" /* onClick={this.goToLink.bind(this, editUrl)} */>
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
  project: ProjectPropType.isRequired,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ProjectCard);
