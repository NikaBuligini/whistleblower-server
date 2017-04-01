import Project from '../schemas/project';
import Service from '../schemas/service';

export function showSingleService(req, res) {
  Service.getById(req.params.serviceId)
    .then((service) => {
      res.render('./pages/service', {
        title: service.name,
        user: req.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function get(req, res) {
  Service.getById(req.params.serviceId)
    .then((service) => {
      if (!service) {
        return res.status(500).json({ message: 'service doesn\'t exists!' });
      }

      return res.json(service);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

export function getByProjectId(req, res) {
  const { projectId } = req.query;

  Project.getById(projectId)
    .then((project) => {
      if (!project) {
        return res.status(500).json({ message: 'Couldn\'t find project!' });
      }

      const result = project.services
        .map(service => service.toObject());

      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

export function create(req, res) {
  const { projectId, name, type } = req.body;

  Project.getById(projectId)
    .then((project) => {
      if (!project) {
        return res.status(500).json({ message: 'project doesn\'t exists!' });
      }

      const servicesWithSameName = project.services.filter(service => service.name === name);

      if (servicesWithSameName.length !== 0) {
        return res.status(500).json({ message: `${name} is already used!` });
      }

      const service = new Service({
        name,
        type,
      });
      service.save();

      project.services.push(service);
      project.save();

      return res.json(service.toObject());
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

export function store(req, res) {
  const { serviceId } = req.params;
  const { name, type, timeout } = req.body;

  Service.findByIdAndUpdate(serviceId, { $set: { name, type, timeout } }, { new: true })
    .exec()
    .then((service) => {
      if (!service) {
        res.status(500).json({ message: 'service doesn\'t exists!' });
      } else {
        res.json(service.toObject());
      }
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

export function activate(req, res) {
  const { serviceId } = req.params;
  const { isActive } = req.body;

  Service.changeActivation(serviceId, isActive)
    .then(service => res.json(service))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}

export function test(req, res) {
  /* eslint-disable no-param-reassign */
  // req.io.sockets.emit('action', { type: 'MEMORY_UPDATE', info: req.body });
  const { uuid, data } = req.body;
  console.log(req.body);
  Service.findOne({ uuid })
    .exec()
    .then((service) => {
      console.log(service);

      if (!service) return res.json('Invalid serviceId');

      service.status = 'ok';
      service.payload.push({
        data,
        created_at: new Date(),
      });
      service.save();

      req.io.sockets.emit('action', {
        type: 'SERVICE_IS_OK',
        schema: 'service',
        socketAPI: { payload: service },
      });

      return res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
}
