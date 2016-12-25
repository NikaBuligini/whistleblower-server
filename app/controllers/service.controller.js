const Project = require('../schemas/project');
const Service = require('../schemas/service');

module.exports = {
  showSingleService(req, res) {
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
  },

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
          .map(service => service.toObject());

        return res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  create(req, res) {
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
  },

  store(req, res) {
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
