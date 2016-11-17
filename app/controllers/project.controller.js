'use strict'

const Project = require('../schemas/project');
const Service = require('../schemas/service');

module.exports = {
  list (req, res) {
    res.render('./pages/projects', {
      title: 'Projects'
    })
  },

  showSingleProject (req, res) {
    res.render('./pages/projects', {
      title: req.params.projectName
    })
  },

  listAll (req, res) {
    Project.getAll()
      .then(projects => {
        return res.json(projects);
      })
  },

  getSingle (req, res) {
    Project.getProjectByName(req.params.projectName)
      .then((project) => {
        res.json(project);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      })
  },

  create (req, res) {
    let name = req.body.projectName;

    Project.getProjectByName(name)
      .then((existingProject) => {
        if (existingProject) {
          return res.status(500).json({message: `${name} is already used!`});
        }

        let project = new Project({
          name: name
        });
        project.save();

        res.json(true);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      })
  },

  createService (req, res) {
    let projectName = req.params.projectName;
    let serviceName = req.body.name;

    Project.getProjectByName(projectName)
      .then((existingProject) => {
        if (!existingProject) {
          return res.status(500).json({message: `${name} doesn\'t exists!`});
        }

        let servicesWithSameName = existingProject.services.filter((service) => {
          return service.name === serviceName;
        });

        if (servicesWithSameName.length !== 0) {
          return res.status(500).json({message: `${serviceName} is already used!`});
        }

        let service = new Service({
          name: serviceName,
          status: 'ok',
          type: 'DISK_USAGE'
        });
        service.save();

        existingProject.services.push(service);
        existingProject.save();

        res.json(true);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      })
  },

  getServicesForProject (req, res) {
    const { projectName } = req.params;

    Project.getProjectServices(req.params.projectName)
      .then((project) => {
        if (!project) {
          return res.status(500).json({message: `Couldn't find ${projectName}!`});
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

  clear (req, res) {
    Project.remove({}).exec();
    res.send('Done');
  }
}
