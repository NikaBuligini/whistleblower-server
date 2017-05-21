import { ServiceSchema as Service } from '../graph/models/schemas';

function isOutdated(payload, { timeout }) {
  if (payload.length === 0) return true;

  const last = payload[payload.length - 1];
  const diff = Math.floor((new Date() - last.created_at) / 60000);

  console.log('timeout', timeout);
  console.log('diff', diff);

  return diff >= timeout;
}

const setup = (CronJob, io) => {
  /* eslint-disable no-param-reassign */

  const cron = new CronJob(
    '*/10 * * * * *',
    () => {
      Service.find({ isActive: true, status: { $ne: 'outdated' } })
        .exec()
        .then((services) => {
          if (services) {
            services.forEach((service) => {
              const { payload } = service;

              if (isOutdated(payload, service)) {
                console.log('service is outdated');
                service.status = 'outdated';
                service.save();
                io.sockets.emit('action', {
                  type: 'SERVICE_OUTDATED',
                  schema: 'service',
                  socketAPI: { payload: service },
                });
              }
            });
          }
        })
        .catch((err) => {
          console.error('statusMonitor', err);
        });
    },
    null,
    true,
  );

  return cron;
};

export default setup;
