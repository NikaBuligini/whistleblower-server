/* eslint-disable global-require, import/no-dynamic-require */

const { CronJob } = require('cron');

const defaultJobs = ['statusMonitor'];
const jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : defaultJobs;

const jobs = [];

function setup() {
  jobTypes.forEach((type) => {
    const job = require(`./${type}`)(CronJob);
    jobs.push(job);
  });
}

module.exports = {
  start: () => {
    if (jobs.length === 0) {
      setup();
    } else {
      console.error('jobs are already started');
    }
  },
  stop: () => { },
};
