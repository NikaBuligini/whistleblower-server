const setup = (CronJob) => {
  const cron = new CronJob('*/5 * * * * *', () => {
    console.log(`check ${new Date()}`);
  }, null, true);

  return cron;
};

module.exports = setup;
