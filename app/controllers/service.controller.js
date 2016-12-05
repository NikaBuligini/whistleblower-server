const Project = require('../schemas/project');
const Service = require('../schemas/service');

module.exports = {
  get(req, res) {
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
  },

  getByProjectId(req, res) {
    const { projectId } = req.query;

    Project.getById(projectId)
      .then((project) => {
        if (!project) {
          return res.status(500).json({ message: 'Couldn\'t find project!' });
        }

        const result = project.services
          .map(service => Object.assign({}, service.toObject(), { project: project.name }));

        return res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  create(req, res) {
    const { projectId, name } = req.body;

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
          status: 'ok',
          type: 'DISK_USAGE',
        });
        service.save();

        project.services.push(service);
        project.save();

        return res.json(Object.assign({}, service.toObject(), { project: project.name }));
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  activate(req, res) {
    const { serviceId } = req.params;

    Service.getById(serviceId)
      .then((service) => {
        if (!service) {
          return res.status(500).json({ message: 'service doesn\'t exists!' });
        }

        const activatedService = service;
        activatedService.is_active = req.body.isActive;
        activatedService.save();

        return res.json(activatedService);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
};
