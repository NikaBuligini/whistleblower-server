'use strict'

const Project = require('../schemas/project');
const Service = require('../schemas/service');

module.exports = {
  get (req, res) {
    Service.getById(req.params.serviceId)
      .then((service) => {
        if (!service) {
          return res.status(500).json({message: `service doesn't exists!`});
        }

        res.json(service);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  getByProjectId (req, res) {
    const { projectId } = req.query;

    Project.getById(projectId)
      .then((project) => {
        if (!project) {
          return res.status(500).json({message: `Couldn't find project!`});
        }

        let result = project.services.map((service) => {
          return Object.assign({}, service.toObject(), { project: project.name });
        });

        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      })
  },

  create (req, res) {
    let { projectId, name } = req.body;

    Project.getById(projectId)
      .then((project) => {
        if (!project) {
          return res.status(500).json({message: `project doesn't exists!`});
        }

        let servicesWithSameName = project.services.filter((service) => {
          return service.name === name;
        });

        if (servicesWithSameName.length !== 0) {
          return res.status(500).json({message: `${name} is already used!`});
        }

        let service = new Service({
          name: name,
          status: 'ok',
          type: 'DISK_USAGE'
        });
        service.save();

        project.services.push(service);
        project.save();

        res.json(Object.assign({}, service.toObject(), { project: project.name }));
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      })
  },

  activate (req, res) {
    const { serviceId } = req.params;

    Service.getById(serviceId)
      .then((service) => {
        if (!service) {
          return res.status(500).json({message: `service doesn't exists!`});
        }

        service.is_active = req.body.isActive;
        service.save();

        res.json(service);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  }
}
