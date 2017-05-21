// @flow

import React from 'react';
import ProjectCard from '../../components/project/ProjectCard';
import type { Project } from '../../actions/types';

type ProjectListProps = {
  data: Array<Edge<Project>>,
};

const ProjectList = ({ data }: ProjectListProps) => (
  <div className="list">
    {data.map(({ node }) => <ProjectCard key={node.id} project={node} />)}
  </div>
);

export default ProjectList;
