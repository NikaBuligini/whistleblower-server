/* eslint-disable global-require, import/no-dynamic-require */

const { CronJob } = require('cron');

const defaultJobs = ['statusMonitor'];
const jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : defaultJobs;

const jobs = [];

function setup(io) {
  jobTypes.forEach((type) => {
    const job = require(`./${type}`)(CronJob, io);
    jobs.push(job);
  });
}

module.exports = {
  start: (io) => {
    if (jobs.length === 0) {
      setup(io);
    } else {
      console.error('jobs are already started');
    }
  },
  stop: () => { },
};
