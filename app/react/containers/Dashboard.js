import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import DefaultLayout from './layouts/DefaultLayout';

class Dashboard extends Component {
  render() {
    const { memory } = this.props;

    return (
      <DefaultLayout>
        <DocumentTitle title="Dashboard">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--10-col mdl-cell--1-offset">
              {this.props.params.projectName}
              <p>Available: {memory.available}</p>
              <p>Free: {memory.free}</p>
              <p>Total: {memory.total}</p>
            </div>
          </div>
        </DocumentTitle>
      </DefaultLayout>
    );
  }
}

function formatBytes(bytes, decimals) {
  if (bytes === 0) return '0 Byte';
  const k = 1000; // or 1024 for binary
  const dm = decimals + 1 || 3;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
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
