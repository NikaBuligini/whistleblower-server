import React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import DefaultLayout from './layouts/DefaultLayout';

const Dashboard = (props) => {
  const { memory, params } = props;

  return (
    <DefaultLayout>
      <DocumentTitle title="Dashboard">
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--10-col mdl-cell--1-offset">
            {params.projectName}
            <p>Available: {memory.available}</p>
            <p>Free: {memory.free}</p>
            <p>Total: {memory.total}</p>
          </div>
        </div>
      </DocumentTitle>
    </DefaultLayout>
  );
};

Dashboard.propTypes = {
  memory: React.PropTypes.shape({
    available: React.PropTypes.string,
    free: React.PropTypes.string,
    total: React.PropTypes.string,
  }),
  params: React.PropTypes.shape({
    projectName: React.PropTypes.string,
  }),
};

function formatBytes(bytes, decimals) {
  if (bytes === 0) return '0 Byte';
  const k = 1000; // or 1024 for binary
  const dm = decimals + 1 || 3;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`;
}

function mapStateToProps(state) {
  const { memory } = state;

  const data = {};
  Object.keys(memory).forEach((key) => {
    data[key] = formatBytes(memory[key], 1);
  });

  return { memory: data };
}

export default connect(mapStateToProps, {})(Dashboard);
